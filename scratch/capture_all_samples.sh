#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARTIFACT_DIR="/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68"

echo "Capturing representative samples with native Chrome..."

# 1. 芹菜炒牛肉 cn-59: Flow & Table (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn59_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn59_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=table"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn59_flow_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=flow"

# 2. 番茄炒蛋 cn-12: Flow & Table (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn12_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-12-xihongshi-jidan?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn12_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-12-xihongshi-jidan?source=local&layout=table"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn12_flow_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-12-xihongshi-jidan?source=local&layout=flow"

# 3. 番茄豆腐羹 cn-24: Flow & Table (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn24_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-24-jianzhi-fanqie-doufugeng?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn24_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-24-jianzhi-fanqie-doufugeng?source=local&layout=table"

# 4. 猪肉炖粉条 cn-14: Flow & Table (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn14_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn14_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=table"

# 5. 布朗尼 v3-espresso-brownies: Flow & Table (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/brownies_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/v3-espresso-brownies?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/brownies_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/v3-espresso-brownies?source=local&layout=table"

# 6. 非连续跳行案例: 鱼香肉丝 cn-01 (Desktop & Mobile)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn01_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-01-yuxiang-rousi?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn01_flow_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-01-yuxiang-rousi?source=local&layout=flow"

echo "All samples captured successfully!"
