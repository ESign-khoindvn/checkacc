<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>ANTI-CHEAT RVA SCANNER V8 - NAM MODDER</title>
    <style>
        :root { --primary: #00ff41; --bg: #050a05; --card: #0d1a0d; --text: #d0ffd0; --cyan: #00e5ff; --lime: #ccff00; --red: #ff3e3e; --orange: #ff9100; --yellow: #ffee00; }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 10px; }
        .container { max-width: 1100px; margin: auto; }
        h1 { color: var(--primary); text-align: center; font-size: 18px; text-transform: uppercase; margin: 15px 0; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0,255,65,0.5); }
        .upload-box { background: var(--card); padding: 20px; border-radius: 12px; border: 2px dashed #1b4b1b; text-align: center; margin-bottom: 20px; }
        .btn-open { background: var(--primary); color: #000; padding: 10px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; display: inline-block; box-shadow: 0 0 15px rgba(0,255,65,0.3); }
        #status { margin-top: 10px; font-size: 12px; color: var(--primary); font-weight: bold; }
        .table-container { background: var(--card); border-radius: 12px; border: 1px solid #1b4b1b; overflow-x: auto; margin-bottom: 80px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th { background: #132713; color: #4e8c4e; padding: 12px 10px; text-align: left; font-size: 10px; border-bottom: 1px solid #1b4b1b; position: sticky; top: 0; z-index: 10; }
        td { padding: 10px; border-bottom: 1px solid #1b4b1b; vertical-align: middle; }
        .method-name { color: #80ffdf; font-weight: bold; display: block; font-size: 12px; }
        .rva-cell { font-family: 'JetBrains Mono', monospace; color: #fff; font-weight: bold; font-size: 14px; cursor: pointer; background: #1a331a; padding: 6px 12px; border-radius: 4px; border: 1px solid #2d5a2d; text-align: center; display: inline-block; min-width: 90px; }
        .rva-cell:hover { background: var(--primary); color: #000; box-shadow: 0 0 10px var(--primary); }
        .patch-box { font-family: 'JetBrains Mono', monospace; font-size: 10px; background: #000; padding: 8px 12px; border-radius: 6px; border: 1px solid #1b4b1b; display: inline-block; white-space: nowrap; color: #fff; }
        .group-header { color: #fff; font-weight: bold; font-size: 11px; padding: 10px !important; letter-spacing: 1px; }
        .g-red { background: var(--red); color: white; border-left: 5px solid #fff; }
        .g-orange { background: var(--orange); color: black; border-left: 5px solid #000; }
        .g-yellow { background: var(--yellow); color: black; border-left: 5px solid #000; }
        .updated { background: rgba(0, 255, 65, 0.1) !important; transition: 0.3s; }
        #toast { visibility: hidden; min-width: 180px; background: var(--primary); color: #000; text-align: center; border-radius: 8px; padding: 12px; position: fixed; z-index: 99; bottom: 30px; left: 50%; transform: translateX(-50%); font-weight: bold; }
        #toast.show { visibility: visible; animation: fadein 0.3s, fadeout 0.3s 1.5s; }
        @keyframes fadein { from {bottom: 0; opacity: 0;} to {bottom: 30px; opacity: 1;} }
        @keyframes fadeout { from {bottom: 30px; opacity: 1;} to {bottom: 0; opacity: 0;} }
    </style>
</head>
<body>

<div id="toast">COPIED RVA!</div>

<div class="container">
    <h1>ANTI-CHEAT RVA SCANNER V8</h1>
    <div class="upload-box">
        <label class="btn-open"> CHỌN FILE DUMP.CS <input type="file" id="fIn" style="display:none" onchange="run()"/></label>
        <div id="status">SẴN SÀNG...</div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr><th>FUNCTION NAME</th><th>RVA (CLICK TO COPY)</th><th>PATCH HEX</th></tr>
            </thead>
            <tbody id="list">
                <tr class="group-header g-red"><td colspan="3">🔴 AnoSDK & FRAME SYNC</td></tr>
                <tr data-sig="InitEx(int gameId, string key)"><td><span class="method-name">AnoSDK.InitEx</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--cyan)">C0035FD6</div></td></tr>
                <tr data-sig="AnoSDKInitEx(int gameID"><td><span class="method-name">AnoSDK.AnoSDKInitEx</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--cyan)">C0035FD6</div></td></tr>
                <tr data-sig="AnoSDKOnResume()"><td><span class="method-name">AnoSDK.AnoSDKOnResume</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--yellow)">000080D2C0035FD6</div></td></tr>
                <tr data-sig="AnoSDKDelReportData4"><td><span class="method-name">AnoSDK.AnoSDKDelReportData4</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--cyan)">C0035FD6</div></td></tr>
                <tr data-sig="AnoSDKFree"><td><span class="method-name">AnoSDK.AnoSDKFree</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--cyan)">C0035FD6</div></td></tr>
                <tr data-sig="LSynchrReport.Reset()"><td><span class="method-name">LSynchrReport.Reset</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="LSynchrReport.CloseUpload()"><td><span class="method-name">LSynchrReport.CloseUpload</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="OnNotifyHashCheckUnsyncByDs"><td><span class="method-name">LSynchrReport.OnNotifyHash</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="DequeHashValueByFrameNum"><td><span class="method-name">LSynchrReport.DequeHash</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="OnActorRevive"><td><span class="method-name">LFrameSync.OnActorRevive</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="CalcuBattleHash()"><td><span class="method-name">LFrameSync.CalcuBattleHash</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="SampleAndSendFrameSyncData"><td><span class="method-name">LFrameSync.SampleSend</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>

                <tr class="group-header g-orange"><td colspan="3">🟠 BATTLE STATISTIC & ANALYTICS</td></tr>
                <tr data-sig="IsNeedReportCompetitionData()"><td><span class="method-name">BattleStat.IsNeedReport</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="ResetCheetCommandSetWarmBattleResultInfo"><td><span class="method-name">BattleStat.ResetCheet (HOOK)</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box" style="color:var(--lime)">F17F049031E2029120021F</div></td></tr>
                <tr data-sig="CreatePetData"><td><span class="method-name">BattleStat.CreatePetData</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="CreateDragonStatistInfo"><td><span class="method-name">BattleStat.CreateDragonInfo</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="GeneralShenFuData"><td><span class="method-name">BattleStat.GeneralShenFu</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="VerifyCondition("><td><span class="method-name">BattleStat.VerifyCondition</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="ReportEventOpenApp"><td><span class="method-name">Apollo.ReportEventOpenApp</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="AddCacheReport"><td><span class="method-name">Apollo.AddCacheReport</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="OnLogin(GCloudChannel"><td><span class="method-name">Apollo.OnLogin</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="FirebasePush.TryReportInfo()"><td><span class="method-name">Firebase.TryReportInfo</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="FirebasePush.reportInfo()"><td><span class="method-name">Firebase.reportInfo</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="GetPushExtraDictObjects"><td><span class="method-name">Firebase.GetPushExtra</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="TrySkipGuideLevel1()"><td><span class="method-name">Lobby.TrySkipGuide</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="onTriggerSecurityDataReport"><td><span class="method-name">Lobby.onTriggerSecurity</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="cacheGameInfoData()"><td><span class="method-name">Settlement.cacheGameInfo</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="ReportTLogDataToLobby"><td><span class="method-name">Settlement.ReportTLog</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="CommonOnRequestAddMatchBlack"><td><span class="method-name">Settlement.AddMatchBlack</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>

                <tr class="group-header g-yellow"><td colspan="3">🟡 CHAT & COMPLAINT SYSTEM</td></tr>
                <tr data-sig="CChatNetUT_On_Chat_NTFMainThread"><td><span class="method-name">CChat.OnChatNTF</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="CChatNetUT_On_Chat_Complaint_NTF"><td><span class="method-name">CChat.OnComplaintNTF</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="CChatNetUT_On_Chat_Complaint_RSP"><td><span class="method-name">CChat.OnComplaintRSP</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="RspSetChatRegion"><td><span class="method-name">CChat.RspSetRegion</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="On_Chat_Complaint_NTF"><td><span class="method-name">CChat.Complaint_NTF</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="Send_Loaidng_Chat"><td><span class="method-name">BattleMsg.SendLoadingChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="SendInBattleMsg_TranslateChat"><td><span class="method-name">BattleMsg.TranslateChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="SendInBattleMsg_PreConfig"><td><span class="method-name">BattleMsg.PreConfigChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="OnSendInBattleMsg_InputChat"><td><span class="method-name">BattleMsg.InputChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="SendInBattleMsg_ChatComplaint"><td><span class="method-name">BattleMsg.Complaint</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="Handle_SendSendInLoaing_LikeChat"><td><span class="method-name">Builder.LoadingLikeChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="Handle_SendInBattleMsg_ChatComplaint"><td><span class="method-name">Builder.ChatComplaint</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="LStateSyncMsgHandler.Handle_SendSendInLoaing_LikeChat"><td><span class="method-name">StateSync.LikeChat</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="LStateSyncMsgHandler.Handle_SendInBattleMsg_ChatComplaint"><td><span class="method-name">StateSync.Complaint</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="GameBuilder.Handle_On_Chat_NTF"><td><span class="method-name">Builder.Chat_NTF</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="GameBuilder.Handle_On_ChatComplaint_NTF"><td><span class="method-name">Builder.Complaint_NTF</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="GameBuilder.Handle_On_ChatComplaint_RSP"><td><span class="method-name">Builder.Complaint_RSP</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
                <tr data-sig="On_ChatRealtimeVoice_Complaint_RSP"><td><span class="method-name">Relay.VoiceComplaint</span></td><td><div class="rva-cell" onclick="copy(this)">...</div></td><td><div class="patch-box">C0035FD6</div></td></tr>
            </tbody>
        </table>
    </div>
</div>

<script>
function copy(cell) {
    const text = cell.innerText;
    if (!text || text === "...") return;
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById("toast");
        toast.className = "show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
    });
}

async function run() {
    const fileInput = document.getElementById('fIn');
    const file = fileInput.files[0];
    if (!file) return;
    document.getElementById('status').innerText = "SCANNING: " + file.name.toUpperCase();
    const rows = Array.from(document.querySelectorAll('#list tr[data-sig]'));
    const reader = file.stream().getReader();
    const decoder = new TextDecoder();
    let partial = '', lastRVA = '';
    while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        const text = partial + decoder.decode(value);
        const lines = text.split(/\r?\n/);
        partial = lines.pop();
        for (const line of lines) {
            const rvaMatch = line.match(/RVA:\s*0x([0-9A-Fa-f]+)/i);
            if (rvaMatch) { lastRVA = rvaMatch[1].toUpperCase(); }
            rows.forEach(row => {
                const sig = row.getAttribute('data-sig');
                if (line.includes(sig) && lastRVA) {
                    row.querySelector('.rva-cell').innerText = lastRVA;
                    row.classList.add('updated');
                }
            });
        }
    }
    document.getElementById('status').innerText = "HOÀN TẤT!";
}
</script>
</body>
</html>
