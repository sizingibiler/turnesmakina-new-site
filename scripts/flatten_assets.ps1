$sourceDir = '../raw_site/assets/media'
$targetDir = './public/assets/flat'

if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

Get-ChildItem -Path $sourceDir -Recurse -Include *.jpg, *.png, *.mp4, *.jpeg, *.gif | ForEach-Object {
    $newFileName = $_.Name.Replace('~', '-').Replace(' ', '-')
    $destinationPath = Join-Path $targetDir $newFileName
    if (Test-Path $destinationPath) {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $extension = $_.Extension
        $i = 1
        do {
            $newFileName = "${baseName}_${i}${extension}"
            $destinationPath = Join-Path $targetDir $newFileName
            $i++
        } while (Test-Path $destinationPath)
    }
    Copy-Item -Path $_.FullName -Destination $destinationPath
    Write-Host "Copied $($_.Name) to $newFileName"
}
