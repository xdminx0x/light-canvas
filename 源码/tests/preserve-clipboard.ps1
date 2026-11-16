param([string]$Node = 'node')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
$saved = New-Object System.Windows.Forms.DataObject
$original = [System.Windows.Forms.Clipboard]::GetDataObject()
if ($original) {
    foreach ($format in $original.GetFormats($false)) {
        try {
            $value = $original.GetData($format, $false)
            if ($value -is [System.IO.MemoryStream]) { $value = New-Object System.IO.MemoryStream(,$value.ToArray()) }
            elseif ($value -is [System.Drawing.Image]) { $value = $value.Clone() }
            if ($null -ne $value) { $saved.SetData($format, $false, $value) }
        } catch { throw 'The existing clipboard could not be preserved; native clipboard test was not started.' }
    }
}
try {
    $env:LC_NATIVE_CLIPBOARD='1'
    & $Node (Join-Path $PSScriptRoot 'clipboard-mentions.mjs')
    $testExit = $LASTEXITCODE
} finally {
    if ($original) { [System.Windows.Forms.Clipboard]::SetDataObject($saved, $true) }
    else { [System.Windows.Forms.Clipboard]::Clear() }
}
exit $testExit
