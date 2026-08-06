# Blink Selection
Original instant menu navigation. Nine options; 02 departs in 45ms, a 30ms empty
gap follows, then 08 brackets reconstruct in 70ms. Total: 145ms.

Frozen geometry: 3×3 grid, four 10px brackets, 5px resting offset. Reduced motion
switches selected semantics immediately. API: `runBlinkSelection`, `resetBlinkSelection`.
