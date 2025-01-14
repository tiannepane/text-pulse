// Required modules
const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('stories'));

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Simple test route
app.get('/test', (req, res) => {
    console.log('Test endpoint hit'); // Extra logging for debugging
    res.json('test ok');
});

// Create story route
app.get('/create-story', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url || ''); // Default to empty string
        const dir = uniqid();
        const storyPath = `./stories/${dir}`;

        if (!fs.existsSync('./stories')) {
            fs.mkdirSync('./stories'); // Ensure the base directory exists
        }

        fs.mkdirSync(storyPath, { recursive: true });

        console.log('Creating story at:', storyPath);

        // Simulate processing options
        const opts = {
            input: `--url ${url} --dir ${storyPath}`,
            disableCache: true,
        };

        // Mock processing (no real implementation provided)
        console.log('Processing story with options:', opts);

        // Assume successful processing
        res.json(dir);
    } catch (e) {
        console.error('Error in /create-story:', e.message);
        res.status(500).json({ error: 'Failed to create story' });
    }
});

// Build video route
app.get('/build-video', async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            console.error('Missing ID');
            return res.status(400).json({ error: 'Missing ID' });
        }

        const dir = `./stories/${id}`;
        if (!fs.existsSync(dir)) {
            console.error('Directory does not exist:', dir);
            return res.status(404).json({ error: 'Directory not found' });
        }

        console.log('Building video for directory:', dir);

        // Mock video processing steps (skipping actual logic)
        console.log('Processing images and audio');

        console.log('Merging videos into final.mp4');
        // Simulated final merge

        res.json(`${id}/final.mp4`);
    } catch (e) {
        console.error('Error in /build-video:', e.message);
        res.status(500).json({ error: 'Failed to build video' });
    }
});

// List samples route
app.get('/samples', (req, res) => {
    try {
        const stories = fs.readdirSync('./stories').filter(dir => {
            return dir.match(/^[a-z0-9]{6,}$/) && fs.existsSync(`./stories/${dir}/final.mp4`);
        });

        console.log('Found samples:', stories);
        res.json(stories);
    } catch (e) {
        console.error('Error in /samples:', e.message);
        res.status(500).json({ error: 'Failed to fetch samples' });
    }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
