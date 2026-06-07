# PythonBlocks - Visual Python Programming 🐍

A visual programming environment that uses Google Blockly to teach Python programming through drag-and-drop blocks.

## 🎯 Latest Updates (v2.0)

### 1. Duplicate Project Name Prevention ✅
- Prevents creating multiple projects with the same name
- Case-insensitive comparison
- Clear error message in Arabic

### 2. Python Standard Libraries (17 New Blocks!) 📚
- **Random** (3 blocks): randint, choice, random
- **Time** (2 blocks): sleep, time
- **Math** (5 blocks): sqrt, pow, floor, ceil, pi
- **Datetime** (4 blocks): now, year, month, day
- **Built-in** (6 blocks): input, int, float, str, len, range

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Server
```bash
node server.js
```

### Open Browser
```
http://localhost:3000
```

## 📦 Features

- ✅ Visual block-based programming interface
- ✅ Automatic Python code generation
- ✅ Run Python code directly from browser
- ✅ Auto-save functionality
- ✅ Dark/Light mode
- ✅ Duplicate name prevention
- ✅ 17+ Python library blocks
- ✅ Fully bilingual (English/Arabic)

## 🔧 Requirements

- Node.js (v14 or higher)
- Python 3.x
- Modern web browser

## 📚 Documentation

- **Arabic**: See `README-AR.md` for full Arabic documentation
- **Quick Start**: `QUICK-START-AR.md`
- **Blocks Reference**: `BLOCKS-REFERENCE-AR.md`
- **Testing Guide**: `TESTING-GUIDE-AR.md`

## 🎓 Example Usage

### Random Number
```python
import random
print(random.randint(1, 100))
```

### Circle Area
```python
import math
radius = 5
area = math.pi * math.pow(radius, 2)
print('Area:', area)
```

### Current Date
```python
from datetime import datetime
print('Year:', datetime.now().year)
```

## 🛠️ Tech Stack

- **Frontend**: Google Blockly, Vanilla JavaScript, CSS3
- **Backend**: Node.js, Express
- **Runtime**: Python 3
- **Data**: JSON file-based storage

## 📁 Project Structure

```
pyblocks-project/
├── Css/                    # Stylesheets
├── data/                   # JSON database
├── javascript/
│   ├── editor.js          # Editor logic
│   ├── projects.js        # Projects management
│   └── python-blocks.js   # Custom Python blocks (NEW!)
├── server.js              # Express server
├── db.js                  # Database functions
└── [HTML files]
```

## 🔐 Security

- 5-second execution timeout
- Isolated Python execution
- Temporary file cleanup
- No arbitrary code execution

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new Python library blocks
- Improve UI/UX
- Translate to other languages
- Report bugs

## 📄 License

MIT License - Feel free to use for educational purposes

## 🙏 Credits

- **Google Blockly** - Visual programming framework
- **Node.js & Express** - Backend infrastructure
- **Python** - Code execution runtime

## 📧 Contact

For questions or support, check the documentation files or open an issue.

---

**Version**: 2.0  
**Last Updated**: June 8, 2026  
**Status**: Stable ✅

---

🇸🇦 **للتوثيق بالعربية، راجع ملف `README-AR.md`**
