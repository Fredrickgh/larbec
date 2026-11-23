# Update CSS class names and HTML class references from gold to violet
$folder = 'c:\Users\FRED\Desktop\larbec international Academy'
$files = Get-ChildItem $folder -Filter '*.html' -Recurse
$files += Get-ChildItem $folder -Filter '*.css' -Recurse

# Define replacements for class names and references
$replacements = @(
    # CSS class definitions
    @{ Old = '.tag-gold'; New = '.tag-violet' },
    @{ Old = '.c-gold'; New = '.c-violet' },
    @{ Old = '.abtn-gold'; New = '.abtn-violet' },
    @{ Old = '.dcard.c-gold'; New = '.dcard.c-violet' },
    # HTML class references
    @{ Old = 'class="abtn abtn-gold"'; New = 'class="abtn abtn-violet"' },
    @{ Old = 'class="dcard c-gold"'; New = 'class="dcard c-violet"' },
    # Comments
    @{ Old = '── HEADER GOLD BAR ──'; New = '── HEADER ACCENT BAR ──' }
)

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    foreach ($replacement in $replacements) {
        if ($replacement.Old -and $content -match [regex]::Escape($replacement.Old)) {
            $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
        }
    }
    
    Set-Content $file.FullName $content
    Write-Host "Updated class names in: $($file.Name)"
}

Write-Host 'All class names updated from gold to violet!'
