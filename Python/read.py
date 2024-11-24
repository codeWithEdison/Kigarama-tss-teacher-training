def read_file_in_chunck(filename, chunk_size =100):
    try:
        with open(filename,'r', encoding='utf-8') as file:
        # file.write('\n this is new append line ')
         while  content:= file.read(100):
        #   print(content)
          return "file read successfully"
    except FileNotFoundError:
        # print('File not found')
        return "file is  not found"
    except PermissionError:
        # print('Permission denied')
        return "permission denied"
    finally:
        print('File operation completed')

def test_read_file_in_chunck():
   # test with a valid file
   assert read_file_in_chunck('myfile.txt') =='file read successfully'

   # test file with a non-existent
   assert read_file_in_chunck('dfhds.txt') =='file not found'

test_read_file_in_chunck()
print(' all test passed !')

# reinveting wheel