#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARTIFACT_DIR="/Users/grangerfdad/.gemini/antigravity-ide/brain/b3d8bae8-a245-4642-ad40-da66b219ac68"

echo "Capturing dual-mode comparison screenshots..."

# cn-14 table vs flow
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn14_compare_table.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=table"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn14_compare_flow.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-14-zhurou-dun-fentiao?source=local&layout=flow"

# cn-59 table vs flow
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn59_compare_table.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=table"
"$CHROME" --headless=new --screenshot="$ARTIFACT_DIR/cn59_compare_flow.png" --window-size=1440,2400 "http://localhost:5173/recipe/cn-59-qincai-niurou?source=local&layout=flow"

echo "Dual-mode screenshots captured!"
