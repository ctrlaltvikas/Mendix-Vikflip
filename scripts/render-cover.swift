import Cocoa

let width = 600
let height = 420

let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: width * 4,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    fatalError("Failed to create CGContext")
}

let nsCtx = NSGraphicsContext(cgContext: context, flipped: false)
NSGraphicsContext.current = nsCtx

// 1. Warm Desk Background Gradient
let bgRect = NSRect(x: 0, y: 0, width: width, height: height)
let bgGradient = NSGradient(colors: [
    NSColor(calibratedRed: 0.91, green: 0.86, blue: 0.78, alpha: 1.0),
    NSColor(calibratedRed: 0.95, green: 0.92, blue: 0.86, alpha: 1.0)
])!
bgGradient.draw(in: bgRect, relativeCenterPosition: NSPoint(x: 0.0, y: -0.1))

// 2. Floating Top Apple Books Chrome Pill
let pillRect = NSRect(x: 160, y: 370, width: 280, height: 34)
let pillPath = NSBezierPath(roundedRect: pillRect, xRadius: 17, yRadius: 17)

let pillShadow = NSShadow()
pillShadow.shadowColor = NSColor(calibratedWhite: 0.0, alpha: 0.12)
pillShadow.shadowOffset = NSSize(width: 0, height: -2)
pillShadow.shadowBlurRadius = 8
pillShadow.set()

NSColor(calibratedWhite: 1.0, alpha: 0.88).setFill()
pillPath.fill()

// Pill Border
NSShadow().set() // Clear shadow
NSColor(calibratedWhite: 0.0, alpha: 0.10).setStroke()
pillPath.lineWidth = 1.0
pillPath.stroke()

// Pill Text
let pillText = "📖  VikFlip • Annual Report"
let pillAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 12, weight: .semibold),
    .foregroundColor: NSColor(calibratedRed: 0.22, green: 0.16, blue: 0.10, alpha: 1.0)
]
let pillTextSize = (pillText as NSString).size(withAttributes: pillAttrs)
(pillText as NSString).draw(at: NSPoint(x: pillRect.midX - pillTextSize.width / 2, y: pillRect.midY - pillTextSize.height / 2), withAttributes: pillAttrs)

// 3. Central Book Spread Geometry
let bookRect = NSRect(x: 70, y: 55, width: 460, height: 295)

// Outer Book 3D Elevation Drop Shadow
let bookShadow = NSShadow()
bookShadow.shadowColor = NSColor(calibratedRed: 0.25, green: 0.16, blue: 0.08, alpha: 0.28)
bookShadow.shadowOffset = NSSize(width: 0, height: -12)
bookShadow.shadowBlurRadius = 24
bookShadow.set()

let bookPath = NSBezierPath(roundedRect: bookRect, xRadius: 6, yRadius: 6)
NSColor(calibratedRed: 0.98, green: 0.94, blue: 0.85, alpha: 1.0).setFill()
bookPath.fill()

NSShadow().set() // Reset shadow

// 4. Center Spine Gutter Shadow (Ambient Occlusion)
let spineX = bookRect.midX
let spineRect = NSRect(x: spineX - 18, y: bookRect.minY, width: 36, height: bookRect.height)
let spineGradient = NSGradient(colors: [
    NSColor(calibratedRed: 0.35, green: 0.22, blue: 0.10, alpha: 0.0),
    NSColor(calibratedRed: 0.35, green: 0.22, blue: 0.10, alpha: 0.22),
    NSColor(calibratedRed: 0.35, green: 0.22, blue: 0.10, alpha: 0.0)
])!
spineGradient.draw(in: spineRect, angle: 0)

// 5. Left Page Content (Embossed "VIK" Cover / Feature Title)
let leftPageRect = NSRect(x: bookRect.minX + 22, y: bookRect.minY + 20, width: (bookRect.width / 2) - 44, height: bookRect.height - 40)

// Badge: "MENDIX PLUGGABLE WIDGET"
let badgeRect = NSRect(x: leftPageRect.minX, y: leftPageRect.maxY - 28, width: 145, height: 20)
let badgePath = NSBezierPath(roundedRect: badgeRect, xRadius: 10, yRadius: 10)
NSColor(calibratedRed: 0.70, green: 0.35, blue: 0.0, alpha: 0.12).setFill()
badgePath.fill()
NSColor(calibratedRed: 0.70, green: 0.35, blue: 0.0, alpha: 0.40).setStroke()
badgePath.lineWidth = 1.0
badgePath.stroke()

let badgeText = "✦ MENDIX PLUGGABLE"
let badgeAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 9, weight: .bold),
    .foregroundColor: NSColor(calibratedRed: 0.65, green: 0.32, blue: 0.0, alpha: 1.0)
]
(badgeText as NSString).draw(at: NSPoint(x: badgeRect.minX + 12, y: badgeRect.minY + 4), withAttributes: badgeAttrs)

// PROMINENT WORD: "VIK"
let vikText = "VIK"
let vikAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 64, weight: .heavy),
    .foregroundColor: NSColor(calibratedRed: 0.20, green: 0.13, blue: 0.06, alpha: 1.0),
    .kern: 3.0
]
(vikText as NSString).draw(at: NSPoint(x: leftPageRect.minX, y: leftPageRect.maxY - 105), withAttributes: vikAttrs)

// Subtitle: "APPLE BOOKS 3D FLIPBOOK"
let subText = "APPLE BOOKS 3D FLIPBOOK"
let subAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 11, weight: .bold),
    .foregroundColor: NSColor(calibratedRed: 0.68, green: 0.36, blue: 0.05, alpha: 1.0),
    .kern: 1.2
]
(subText as NSString).draw(at: NSPoint(x: leftPageRect.minX + 2, y: leftPageRect.maxY - 128), withAttributes: subAttrs)

// Paragraph description
let descText = "Realistic page curls, cloth-physics drag resistance, and ambient procedural Web Audio acoustics."
let descAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 10, weight: .regular),
    .foregroundColor: NSColor(calibratedRed: 0.45, green: 0.36, blue: 0.26, alpha: 1.0)
]
let descRect = NSRect(x: leftPageRect.minX + 2, y: leftPageRect.minY + 36, width: leftPageRect.width - 10, height: 42)
(descText as NSString).draw(in: descRect, withAttributes: descAttrs)

// Folio left: "Page 1 • VIK"
let folioLeft = "p. 1 • VIK"
let folioAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.monospacedSystemFont(ofSize: 9, weight: .medium),
    .foregroundColor: NSColor(calibratedRed: 0.60, green: 0.50, blue: 0.40, alpha: 1.0)
]
(folioLeft as NSString).draw(at: NSPoint(x: leftPageRect.minX + 2, y: leftPageRect.minY + 4), withAttributes: folioAttrs)

// 6. Right Page Content (Metrics & Tactile Page-Curl Physics)
let rightPageRect = NSRect(x: spineX + 22, y: bookRect.minY + 20, width: (bookRect.width / 2) - 44, height: bookRect.height - 40)

let rightHeading = "Tactile Physics & Audio"
let rightHeadingAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 15, weight: .bold),
    .foregroundColor: NSColor(calibratedRed: 0.20, green: 0.13, blue: 0.06, alpha: 1.0)
]
(rightHeading as NSString).draw(at: NSPoint(x: rightPageRect.minX, y: rightPageRect.maxY - 25), withAttributes: rightHeadingAttrs)

// Two Metric Cards
let card1Rect = NSRect(x: rightPageRect.minX, y: rightPageRect.maxY - 85, width: 85, height: 48)
let card1Path = NSBezierPath(roundedRect: card1Rect, xRadius: 6, yRadius: 6)
NSColor(calibratedWhite: 0.0, alpha: 0.035).setFill()
card1Path.fill()
NSColor(calibratedWhite: 0.0, alpha: 0.08).setStroke()
card1Path.lineWidth = 1
card1Path.stroke()

let m1Label = "FPS RENDER"
let m1Val = "120Hz"
let m1LabelAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 8, weight: .bold),
    .foregroundColor: NSColor(calibratedRed: 0.55, green: 0.45, blue: 0.35, alpha: 1.0)
]
let m1ValAttrs: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: 14, weight: .bold),
    .foregroundColor: NSColor(calibratedRed: 0.20, green: 0.13, blue: 0.06, alpha: 1.0)
]
(m1Label as NSString).draw(at: NSPoint(x: card1Rect.minX + 8, y: card1Rect.maxY - 16), withAttributes: m1LabelAttrs)
(m1Val as NSString).draw(at: NSPoint(x: card1Rect.minX + 8, y: card1Rect.minY + 8), withAttributes: m1ValAttrs)

let card2Rect = NSRect(x: rightPageRect.minX + 95, y: rightPageRect.maxY - 85, width: 85, height: 48)
let card2Path = NSBezierPath(roundedRect: card2Rect, xRadius: 6, yRadius: 6)
NSColor(calibratedWhite: 0.0, alpha: 0.035).setFill()
card2Path.fill()
NSColor(calibratedWhite: 0.0, alpha: 0.08).setStroke()
card2Path.lineWidth = 1
card2Path.stroke()

let m2Label = "AUDIO SYNTH"
let m2Val = "0ms"
(m2Label as NSString).draw(at: NSPoint(x: card2Rect.minX + 8, y: card2Rect.maxY - 16), withAttributes: m1LabelAttrs)
(m2Val as NSString).draw(at: NSPoint(x: card2Rect.minX + 8, y: card2Rect.minY + 8), withAttributes: m1ValAttrs)

// Simulated text lines on right page
for i in 0..<4 {
    let lineY = rightPageRect.maxY - 110 - CGFloat(i * 14)
    let linePath = NSBezierPath()
    linePath.move(to: NSPoint(x: rightPageRect.minX, y: lineY))
    linePath.line(to: NSPoint(x: rightPageRect.maxX - 15, y: lineY))
    NSColor(calibratedRed: 0.75, green: 0.68, blue: 0.58, alpha: 0.45).setStroke()
    linePath.lineWidth = 3.5
    linePath.stroke()
}

// 7. Tactile 3D Curled Corner on Bottom-Right
let curlSize: CGFloat = 65.0
let curlOrigin = NSPoint(x: bookRect.maxX, y: bookRect.minY)

// Shadow under the curl
let underCurlPath = NSBezierPath()
underCurlPath.move(to: NSPoint(x: curlOrigin.x - curlSize - 10, y: curlOrigin.y))
underCurlPath.line(to: NSPoint(x: curlOrigin.x, y: curlOrigin.y + curlSize + 10))
underCurlPath.line(to: curlOrigin)
underCurlPath.close()

let underCurlShadow = NSShadow()
underCurlShadow.shadowColor = NSColor(calibratedWhite: 0.0, alpha: 0.35)
underCurlShadow.shadowOffset = NSSize(width: -6, height: 6)
underCurlShadow.shadowBlurRadius = 12
underCurlShadow.set()
NSColor(calibratedRed: 0.88, green: 0.82, blue: 0.72, alpha: 1.0).setFill()
underCurlPath.fill()

NSShadow().set() // Reset

// Curled Paper Flap Path
let flapPath = NSBezierPath()
flapPath.move(to: NSPoint(x: curlOrigin.x - curlSize, y: curlOrigin.y))
flapPath.line(to: NSPoint(x: curlOrigin.x, y: curlOrigin.y + curlSize))
flapPath.curve(to: NSPoint(x: curlOrigin.x - curlSize, y: curlOrigin.y),
               controlPoint1: NSPoint(x: curlOrigin.x - curlSize * 0.45, y: curlOrigin.y + curlSize * 0.55),
               controlPoint2: NSPoint(x: curlOrigin.x - curlSize * 0.85, y: curlOrigin.y + curlSize * 0.15))
flapPath.close()

let flapGradient = NSGradient(colors: [
    NSColor(calibratedRed: 1.0, green: 0.98, blue: 0.93, alpha: 1.0),
    NSColor(calibratedRed: 0.92, green: 0.86, blue: 0.76, alpha: 1.0)
])!
flapGradient.draw(in: flapPath, angle: 135)

// Flap edge stroke
NSColor(calibratedWhite: 0.0, alpha: 0.10).setStroke()
flapPath.lineWidth = 0.8
flapPath.stroke()

// Export to PNG
guard let imageRef = context.makeImage() else {
    fatalError("Failed to make CGImage")
}

let bitmapRep = NSBitmapImageRep(cgImage: imageRef)
guard let pngData = bitmapRep.representation(using: .png, properties: [:]) else {
    fatalError("Failed to convert to PNG")
}

let outUrl = URL(fileURLWithPath: "assets/cover-image.png")
try pngData.write(to: outUrl)

let screenshot1Url = URL(fileURLWithPath: "assets/screenshots/screenshot-1-sepia-two-page-spread.png")
try pngData.write(to: screenshot1Url)

print("✅ Successfully generated premium cover image with word VIK (600x420 px)")
