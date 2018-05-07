**Cách đóng góp stickers:**
1. Fork
2. Sửa file [src/stickers/sticker.json](https://github.com/mangcut/linkhay/blob/master/src/stickers/sticker.json)
3. Pull request

**Ví dụ**

Thêm 1 sticker:
```
"*some text*": "https://path/to/file"
```

File có thể là file ảnh hoặc *mp4*, *http* hay *https* đều ok.
Nếu là file *gif* trên *giphy* thì nên thay đuôi *gif* thành đuôi *mp4* vì file *mp4* nhẹ hơn rất nhiều.
File local có thể up lên *imgur.com* và dùng link trực tiếp (direct link) của imgur.

Mặc định, sticker sẽ có chiều cao 160px và chiều rộng theo tỉ lệ gốc.
Video thì sẽ autoplay, muted, loop, và không hiện control.

Tất cả các điểm mặc định trên đều thay đổi được. Ví dụ muốn hiện ảnh kích thước thực:
```
"*some text*": {
  "src": "https://path/to/file.png",
  "css": { "width": "auto" }
 }
 ```
 
 Các nội dung phản cảm sẽ không được chấp nhận.
