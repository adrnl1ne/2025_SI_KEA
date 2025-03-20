import base64

def encode_string(input_string):
    encoded_bytes = base64.b64encode(input_string.encode('utf-8'))
    encoded_string = encoded_bytes.decode('utf-8')
    return encoded_string

def decode_string(encoded_string):
    decoded_bytes = base64.b64decode(encoded_string.encode('utf-8'))
    decoded_string = decoded_bytes.decode('utf-8')
    return decoded_string

if __name__ == "__main__":
    original_string = "Hello, World!"
    encoded = encode_string(original_string)
    print(f"Encoded: {encoded}")
    
    decoded = decode_string(encoded)
    print(f"Decoded: {decoded}")