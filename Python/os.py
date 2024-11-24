import os
print("curent working directory: ", os.getcwd())
os.chdir('../RTB-SOD/')

print("now working directory: ", os.getcwd())

file_path = 'myfile.txt'

if os.access(file_path, os.R_OK):
    print(f'File {file_path} is readable.')
else:
    print(f'File {file_path} is not readable.')

if os.access(file_path, os.W_OK):
    print(f'File {file_path} is writable.')
else:
    print(f'File {file_path} is not writable.')

os.remove(file_path)
os.rmdir(file_path)

