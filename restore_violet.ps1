# Revert to proper violet colors (not blended away)
$folder = 'c:\Users\FRED\Desktop\larbec international Academy'
$files = Get-ChildItem $folder -Filter '*.html' -Recurse
$files += Get-ChildItem $folder -Filter '*.css' -Recurse

# Revert blended lavender back to proper violet
$replacements = @(
    # Revert main violet color
    @{ Old = '#E0D9F8'; New = '#7C3AED' },
    # Revert light violet color
    @{ Old = '#F3E8FF'; New = '#A78BFA' },
    # Revert RGBA values to proper violet
    @{ Old = 'rgba(224,217,248,.25)'; New = 'rgba(124,58,237,.15)' },
    @{ Old = 'rgba(224,217,248,.35)'; New = 'rgba(124,58,237,.18)' },
    @{ Old = 'rgba(224,217,248,.30)'; New = 'rgba(124,58,237,.15)' },
    @{ Old = 'rgba(224,217,248,.15)'; New = 'rgba(124,58,237,.08)' },
    @{ Old = 'rgba(224,217,248,.4)'; New = 'rgba(124,58,237,.2)' },
    @{ Old = 'rgba(224,217,248,.45)'; New = 'rgba(124,58,237,.25)' },
    @{ Old = 'rgba(224,217,248,.9)'; New = 'rgba(124,58,237,.9)' },
    @{ Old = 'rgba(224,217,248,.8)'; New = 'rgba(124,58,237,.8)' },
    @{ Old = 'rgba(224,217,248,.28)'; New = 'rgba(124,58,237,.15)' },
    @{ Old = 'rgba(224,217,248,.18)'; New = 'rgba(124,58,237,.1)' }
)

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    foreach ($replacement in $replacements) {
        if ($replacement.Old -and $content -match [regex]::Escape($replacement.Old)) {
            $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
        }
    }
    
    Set-Content $file.FullName $content
    Write-Host "Updated: $($file.Name)"
}

Write-Host 'Violet colors restored!'
