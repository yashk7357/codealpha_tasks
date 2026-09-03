# 🎯 AI Object Detection & Tracking

A real-time **AI-based Object Detection and Tracking system** developed using Python, OpenCV, and YOLO as part of the **CodeAlpha Internship – Task 4**.

The application uses a webcam to detect objects in real time, display bounding boxes and labels, track detected objects, and show the total number of detected objects.

## ✨ Features

- 🤖 Real-time object detection using YOLO
- 🎯 Object tracking
- 📷 Webcam support
- 📦 Bounding boxes around detected objects
- 🏷️ Object labels
- 🔢 Real-time object count
- ⚡ Live video processing
- 🖥️ Simple and professional interface
- ⌨️ Press `Q` to exit
- 📱 Easy to run and use

## 🧠 How It Works

1. The application opens the computer's webcam.
2. Each video frame is captured using OpenCV.
3. YOLO processes the frame and detects objects.
4. Detected objects are displayed with bounding boxes and labels.
5. YOLO tracking maintains object tracking across frames.
6. The application displays the number of detected objects.
7. Press `Q` to close the application.

## 🛠️ Technologies Used

- Python
- OpenCV
- YOLO
- Ultralytics
- PyTorch

## 📂 Project Structure

```text
Task4_Object_Detection_Tracking/
│
├── app.py
├── requirements.txt
└── README.md
```

## ⚙️ Installation

Make sure Python is installed on your system.

Install the required libraries using:

```bash
pip install -r requirements.txt
```

## 🚀 How to Run

Open the project folder in VS Code and run:

```bash
python app.py
```

The webcam will open and the system will start detecting and tracking objects in real time.

Press:

```text
Q
```

to exit the application.

## 🎯 Example Use Cases

- Smart surveillance
- Traffic monitoring
- Crowd monitoring
- Security applications
- Computer vision projects
- Real-time object analysis

## 🎓 Internship Task

**CodeAlpha Internship – Task 4: Object Detection and Tracking**

This project demonstrates real-time object detection and tracking using YOLO and OpenCV.

## 📌 Project Status

**Completed ✅**

Developed for educational and internship purposes.
