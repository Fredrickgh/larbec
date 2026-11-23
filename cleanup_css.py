import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove everything from <!-- Firebase SDK comment through </style> 
pattern = r'<!-- Firebase SDK.*?</style>'
content = re.sub(pattern, '<!-- Firebase SDK (Compat Version) -->', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("CSS cleanup complete!")
