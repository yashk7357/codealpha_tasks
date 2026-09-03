import cv2
from ultralytics import YOLO
from collections import defaultdict

# Load YOLO model
model = YOLO("yolo11n.pt")

# Open webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("❌ Unable to access webcam.")
    exit()

# Store tracking history
track_history = defaultdict(list)

print("========================================")
print("  YOLO Object Detection & Tracking")
print("  Press Q to quit")
print("========================================")

while True:

    success, frame = cap.read()

    if not success:
        print("❌ Unable to read camera frame.")
        break

    # YOLO detection + tracking
    results = model.track(
        frame,
        persist=True,
        verbose=False
    )

    annotated_frame = results[0].plot()

    # Detection information
    detected_objects = results[0].boxes

    object_count = len(detected_objects)

    # Add title
    cv2.putText(
        annotated_frame,
        "AI Object Detection & Tracking",
        (20, 35),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.9,
        (255, 255, 255),
        2
    )

    # Display object count
    cv2.putText(
        annotated_frame,
        f"Objects Detected: {object_count}",
        (20, 70),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )

    # Display instruction
    cv2.putText(
        annotated_frame,
        "Press Q to Exit",
        (20, 105),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (255, 255, 255),
        2
    )

    # Show result
    cv2.imshow(
        "YOLO Object Detection & Tracking",
        annotated_frame
    )

    # Quit with Q
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# Release resources
cap.release()
cv2.destroyAllWindows()

print("✅ Application closed successfully.")