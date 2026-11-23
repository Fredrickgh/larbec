# Replace inline RGBA gold colors with violet RGBA
$folder = 'c:\Users\FRED\Desktop\larbec international Academy'
$files = Get-ChildItem $folder -Filter '*.html' -Recurse

# RGB values: Gold = 201,168,76 → Violet = 124,58,237
$replacements = @(
    @{ Old = 'rgba(201,168,76,.09)'; New = 'rgba(124,58,237,.09)' },
    @{ Old = 'rgba(201,168,76,.18)'; New = 'rgba(124,58,237,.18)' },
    @{ Old = 'rgba(201,168,76,.08)'; New = 'rgba(124,58,237,.08)' },
    @{ Old = 'rgba(201,168,76,.15)'; New = 'rgba(124,58,237,.15)' },
    @{ Old = 'rgba(201,168,76,.05)'; New = 'rgba(124,58,237,.05)' },
    @{ Old = 'rgba(201,168,76,.9)'; New = 'rgba(124,58,237,.9)' },
    @{ Old = 'rgba(201,168,76,.8)'; New = 'rgba(124,58,237,.8)' },
    @{ Old = 'rgba(201,168,76,.3)'; New = 'rgba(124,58,237,.3)' },
    @{ Old = 'rgba(201,168,76,.1)'; New = 'rgba(124,58,237,.1)' },
    @{ Old = 'rgba(201,168,76,.4)'; New = 'rgba(124,58,237,.4)' },
    @{ Old = 'rgba(201,168,76,.2)'; New = 'rgba(124,58,237,.2)' },
    @{ Old = 'rgba(201,168,76,.06)'; New = 'rgba(124,58,237,.06)' },
    @{ Old = 'rgba(201,168,76,.25)'; New = 'rgba(124,58,237,.25)' },
    @{ Old = 'rgba(201,168,76,.12)'; New = 'rgba(124,58,237,.12)' }
)

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    foreach ($replacement in $replacements) {
        if ($replacement.Old -and $content -match [regex]::Escape($replacement.Old)) {
            $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
        }
    }
    
    Set-Content $file.FullName $content
    Write-Host "Updated RGBA colors in: $($file.Name)"
}

Write-Host 'All inline RGBA gold colors replaced with violet!'
