#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARTIFACT_DIR="/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68"

echo "=== 1. Capturing Case A (Remote 2-step cn-59) ==="
# Case A Desktop (Auto & Flow - default URL with no source=local)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_a_cn59_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou"
# Case A Mobile 390px
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_a_cn59_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-59-qincai-niurou"

echo "=== 2. Capturing Case B (Local 4-step cn-59) ==="
# Case B Desktop Flow
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_b_cn59_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=flow"
# Case B Desktop Table
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_b_cn59_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=table"
# Case B Mobile 390px Flow & Table
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_b_cn59_flow_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/case_b_cn59_table_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=table"

echo "=== 3. Capturing Representative Recipes ==="
# cn-01 (Yuxiang Rousi - non-contiguous multi-row inputs)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn01_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-01-yuxiang-rousi?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn01_flow_mobile.png" --window-size=390,1600 "http://localhost:5173/recipe/cn-01-yuxiang-rousi?source=local&layout=flow"

# cn-12 (Fanqie Chaodan - hold aside & return to wok)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn12_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-12-xihongshi-jidan?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn12_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-12-xihongshi-jidan?source=local&layout=table"

# cn-14 (Zhurou Dun Fentiao - staged entry)
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn14_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_cn14_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=table"

# Brownies
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_brownies_flow_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/v3-espresso-brownies?source=local&layout=flow"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/verify_brownies_table_desktop.png" --window-size=1440,2400 "http://localhost:5173/recipe/v3-espresso-brownies?source=local&layout=table"

echo "=== All screenshots captured! ==="
