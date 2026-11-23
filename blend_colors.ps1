# Blend violet colors with white for better harmony with navy blue
$folder = 'c:\Users\FRED\Desktop\larbec international Academy'
$files = Get-ChildItem $folder -Filter '*.html' -Recurse
$files += Get-ChildItem $folder -Filter '*.css' -Recurse

# Replace violet with lighter blended violet-white shades
$replacements = @(
    # Replace the main violet with light lavender (violet-white blend)
    @{ Old = '#7C3AED'; New = '#E0D9F8' },
    # Replace the light violet with very light lavender
    @{ Old = '#A78BFA'; New = '#F3E8FF' },
    # Update RGBA violet colors with lighter versions
    @{ Old = 'rgba(124,58,237,.09)'; New = 'rgba(224,217,248,.25)' },
    @{ Old = 'rgba(124,58,237,.18)'; New = 'rgba(224,217,248,.35)' },
    @{ Old = 'rgba(124,58,237,.08)'; New = 'rgba(224,217,248,.25)' },
    @{ Old = 'rgba(124,58,237,.15)'; New = 'rgba(224,217,248,.30)' },
    @{ Old = 'rgba(124,58,237,.05)'; New = 'rgba(224,217,248,.15)' },
    @{ Old = 'rgba(124,58,237,.9)'; New = 'rgba(224,217,248,.9)' },
    @{ Old = 'rgba(124,58,237,.8)'; New = 'rgba(224,217,248,.8)' },
    @{ Old = 'rgba(124,58,237,.3)'; New = 'rgba(224,217,248,.4)' },
    @{ Old = 'rgba(124,58,237,.1)'; New = 'rgba(224,217,248,.25)' },
    @{ Old = 'rgba(124,58,237,.4)'; New = 'rgba(224,217,248,.45)' },
    @{ Old = 'rgba(124,58,237,.2)'; New = 'rgba(224,217,248,.30)' },
    @{ Old = 'rgba(124,58,237,.06)'; New = 'rgba(224,217,248,.18)' },
    @{ Old = 'rgba(124,58,237,.25)'; New = 'rgba(224,217,248,.35)' },
    @{ Old = 'rgba(124,58,237,.12)'; New = 'rgba(224,217,248,.28)' }
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

Write-Host 'All violet colors blended with white for better harmony!'
