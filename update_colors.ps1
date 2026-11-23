# Update all gold colors to violet/white across all HTML and CSS files
$folder = 'c:\Users\FRED\Desktop\larbec international Academy'
$files = Get-ChildItem $folder -Filter '*.html' -Recurse
$files += Get-ChildItem $folder -Filter '*.css' -Recurse

# Define color replacements
$replacements = @(
    # Replace gold color references with violet
    @{ Old = 'var(--gold-light)'; New = 'var(--violet-light)' },
    @{ Old = 'var(--gold-pale)'; New = 'var(--white)' },
    @{ Old = 'var(--gold)'; New = 'var(--violet)' },
    @{ Old = '#C9A84C'; New = '#7C3AED' },
    @{ Old = '#E8C97A'; New = '#A78BFA' },
    @{ Old = '#FDF6E3'; New = '#FFFFFF' },
    # Replace old gold variable definitions
    @{ Old = '--gold-pale: #FDF6E3;'; New = '' },
    @{ Old = '--gold-light: #E8C97A;'; New = '' },
    @{ Old = '--gold: #C9A84C;'; New = '' }
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

Write-Host 'All gold colors replaced with violet/white!'
