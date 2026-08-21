$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

$root = "c:\Users\jinyixu\Desktop\车书知识库管理平台"

$mimeMap = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $localPath = $req.Url.LocalPath.TrimStart("/")

  if ($localPath -eq "") { $localPath = "index.html" }
  $filePath = Join-Path $root $localPath

  if ((Test-Path $filePath -PathType Leaf) -and $localPath -notmatch '\.\.') {
    $ext = [IO.Path]::GetExtension($filePath).ToLower()
    $ct = $mimeMap[$ext]
    if (-not $ct) { $ct = "application/octet-stream" }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $ctx.Response.ContentType = $ct
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.Close()
}