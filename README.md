# fluorite-stage

Claude 桌面版的主題 mod：黃昏的音樂室——洋紅色的陰影、穿過高窗的陽光、飄浮的微塵與淡淡的數位光點。

## 在 macOS 安裝

1. 把這個 repo 複製到 `~/.claude/mods`：

   ```bash
   mkdir -p ~/.claude/mods && git clone https://github.com/Koukw/fluorite-stage.git ~/.claude/mods/fluorite-stage
   ```

2. 在 `~/.claude/settings.json` 的 `env` 裡加上（把 `你的帳號` 換成 Mac 的使用者名稱，或用 `echo ~/.claude/mods/fluorite-stage` 查完整路徑）：

   ```json
   {
     "env": {
       "CLAUDE_CODE_PLUGIN_DIRS": "/Users/你的帳號/.claude/mods/fluorite-stage"
     }
   }
   ```

   檔案裡已經有其他設定的話，只要把這一行併進現有的 `env` 就好。

3. 完全結束 Claude 桌面版（⌘Q，不是只關視窗），再重新打開。

## 更新

```bash
git -C ~/.claude/mods/fluorite-stage pull
```

拉完一樣要 ⌘Q 再重開一次。
