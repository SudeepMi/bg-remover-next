from backgroundremover.bg import remove
from flask import Flask
app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def remove_bg(src_img_path, out_img_path):
    model_choices = ["u2net", "u2net_human_seg", "u2netp"]
    f = open(src_img_path, "rb")
    data = f.read()
    img = remove(data, model_name=model_choices[0],
                 alpha_matting=True,
                 alpha_matting_foreground_threshold=240,
                 alpha_matting_background_threshold=10,
                 alpha_matting_erode_structure_size=10,
                 alpha_matting_base_size=1000)
    f.close()
    f = open(out_img_path, "wb")
    f.write(img)
    f.close()
@app.route('/', methods=['GET'])
def test():
    return "Hello from Flask on Next 14"
    
if __name__ == '__main__':
    app.run(port=5328)