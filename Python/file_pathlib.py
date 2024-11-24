from pathlib import Path
file = Path('myfile.txt')
folder = Path('myfolder')
folder.mkdir()
if not file.exists():
    file.touch()
    print(f'File {file.name} created successfully.')
else:
    print(f'File {file.name} already exists.')