import os

def main():
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    files.sort()  # Optional: sort for predictable order
    
    for idx, filename in enumerate(files, 1):
        ext = os.path.splitext(filename)[1]
        new_name = f'{idx}{ext}'
        if os.path.exists(new_name):
            continue  # Skip if target exists
        os.rename(filename, new_name)

if __name__ == '__main__':
    main() 