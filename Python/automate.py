from pathlib import Path

def update_config_file():
    config_file = Path('.env')  # Make sure the file name is correct

    # Check if the file exists
    if not config_file.exists():
        config_file.touch()  # Create the file if it doesn't exist
        print(f"Config file '{config_file}' was created.")
    
    try:
        with config_file.open('a') as f:
            f.write('\nDB_HOST=localhost')
            f.flush()
            print('Config file updated successfully.')
    except Exception as e:
        print(f'Error updating config file: {e}')

update_config_file()
