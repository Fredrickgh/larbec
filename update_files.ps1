# Get all HTML files that need updating
$files = Get-ChildItem 'c:\Users\FRED\Desktop\larbec international Academy' -Filter '*.html' -Recurse | Where-Object { $_.Name -match '(admission|gallery|student-portal|admin-portal)' }

# Define replacements
$replacements = @(
    @{ Old = 'Hybrid Montessori School'; New = 'Larbec International Academy' },
    @{ Old = 'Hybrid Montessori'; New = 'Larbec International' },
    @{ Old = 'HMS'; New = 'Larbec' },
    @{ Old = 'Aputuogya, Ashanti Region'; New = 'Atonsu-Fabi, Kumasi' },
    @{ Old = 'Aputuogya'; New = 'Atonsu-Fabi' },
    @{ Old = 'hmsimages'; New = 'larbec piccs' },
    @{ Old = 'hmsInternalNav'; New = 'larbecInternalNav' },
    @{ Old = '055 860 0100'; New = '+233 26 643 4973' },
    @{ Old = 'hybridmontessorigh@gmail.com'; New = 'info@larbec.edu.gh' }
)

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    foreach ($replacement in $replacements) {
        $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
    }
    Set-Content $file.FullName $content
    Write-Host "Updated: $($file.Name)"
}

Write-Host 'All files updated!'
