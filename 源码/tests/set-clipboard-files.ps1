param([string]$First, [string]$Second)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
$files = New-Object System.Collections.Specialized.StringCollection
[void]$files.Add($First)
[void]$files.Add($Second)
[System.Windows.Forms.Clipboard]::SetFileDropList($files)
