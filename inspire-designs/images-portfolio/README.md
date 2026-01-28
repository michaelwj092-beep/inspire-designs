# Portfolio Images

This folder contains images displayed in the **portfolio gallery** on the website.

## Folder Structure

### `/series-graphics`
Images for series graphics projects (sermon series, event graphics, etc.)

### `/church-media`
Images for church media projects (announcements, social media, etc.)

## Usage
- Images are displayed in the filterable portfolio grid
- Controlled by `script.js`
- Referenced in `config.js` under `CONFIG.portfolio.categories`

## Image Requirements
- **Format**: JPG or PNG
- **Recommended Size**: 1200-1600px width for high-quality display
- **Aspect Ratio**: Any (natural aspect ratios are preserved in the grid)
- Images will maintain their original aspect ratio in the masonry grid

## Configuration
Update `config.js` to point to these new folders:
```javascript
CONFIG.portfolio.categories = {
    seriesGraphics: {
        name: "Series Graphics",
        images: [
            "images-portfolio/series-graphics/image1.jpg",
            // ...
        ]
    },
    churchMedia: {
        name: "Church Media",
        images: [
            "images-portfolio/church-media/image1.jpg",
            // ...
        ]
    }
}
```
