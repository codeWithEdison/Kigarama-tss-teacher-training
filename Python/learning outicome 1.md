# Chapter 1: Getting Started with Python

## 1.1 Introduction to Python

### What is Python?
Python is a high-level, interpreted programming language created by Guido van Rossum. It emphasizes code readability with its notable use of significant indentation, making it an ideal first programming language for beginners while being powerful enough for professional software development.

### Benefits and Characteristics
- **Readability**: Clean syntax with mandatory indentation
- **Versatility**: Supports multiple programming paradigms (procedural, object-oriented, functional)
- **Rich Ecosystem**: Extensive standard library and third-party packages
- **Cross-platform**: Runs on Windows, macOS, Linux, and other platforms
- **Interpreted**: No compilation needed, immediate feedback during development

### Applications of Python

#### Data Science
- Data analysis and visualization
- Machine learning and AI
- Statistical modeling
- Big data processing
```python
# Example: Simple data analysis using pandas
import pandas as pd

data = pd.read_csv('data.csv')
print(data.describe())
```

#### Software Development
- Web applications (Django, Flask)
- Desktop applications (PyQt, Tkinter)
- API development
- Testing and automation
```python
# Example: Simple web application using Flask
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'
```

#### Automation
- System administration
- Task automation
- Batch processing
```python
# Example: Automating file operations
import os

def organize_files(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.txt'):
            os.rename(filename, f'text_{filename}')
```

#### Data Analytics
- Business intelligence
- Predictive analytics
- Reporting
```python
# Example: Basic data visualization
import matplotlib.pyplot as plt

data = [1, 2, 3, 4, 5]
plt.plot(data)
plt.title('Simple Line Plot')
plt.show()
```

## 1.2 Setting Up Python Environment

### System Requirements

#### Hardware Requirements
- Minimum:
  - 1 GHz processor
  - 2 GB RAM
  - 1 GB free disk space
- Recommended:
  - 2 GHz+ processor
  - 4 GB+ RAM
  - 5 GB+ free disk space

#### Software Requirements
- Operating System: Windows 7+, macOS 10.11+, or Linux
- Internet connection for package installation
- Text editor or IDE

### Installing Python Tools

1. **Download Python**
   - Visit python.org/downloads
   - Choose the latest stable version
   - Download appropriate installer for your OS

2. **Installation Steps**
```bash
# Windows
# Run installer and check "Add Python to PATH"

# macOS
brew install python3

# Linux
sudo apt-get update
sudo apt-get install python3
```

3. **Install Package Manager (pip)**
```bash
# Verify pip installation
python -m pip --version

# Update pip
python -m pip install --upgrade pip
```

### Configuring Virtual Environment

Virtual environments isolate project dependencies:

```bash
# Create virtual environment
python -m venv myenv

# Activate virtual environment
# Windows
myenv\Scripts\activate

# macOS/Linux
source myenv/bin/activate

# Install packages in virtual environment
pip install package_name
```

### Testing Installation

#### Running Python Version Command
```bash
python --version
```

#### Checking Python Interpreter
```python
# Start Python interpreter
python

# Test basic operations
>>> 2 + 2
4
>>> print("Hello, World!")
Hello, World!
>>> exit()
```

#### Testing Package Manager
```bash
# List installed packages
pip list

# Install a test package
pip install requests

# Test the package
python -c "import requests; print(requests.__version__)"
```

## Practice Exercises

1. **Environment Setup**
   - Install Python on your system
   - Create a virtual environment
   - Install three different packages
   - List installed packages

2. **Basic Script Creation**
```python
# Create a file named hello.py
print("Hello, Python!")
name = input("What's your name? ")
print(f"Welcome to Python, {name}!")
```

3. **Package Management**
   - Create requirements.txt
   - Install packages from requirements.txt
   - Create a simple script using an installed package

## Review Questions

1. What are the key characteristics of Python?
2. Why use virtual environments?
3. How do you check Python version?
4. What is pip and why is it important?
5. Name three application areas of Python.

## Summary
- Python is a versatile programming language suitable for various applications
- Proper environment setup is crucial for development
- Virtual environments help manage project dependencies
- Python has a rich ecosystem of packages and tools
- Basic installation testing ensures development readiness