# Script de déploiement automatique
# À exécuter manuellement une fois, puis le script surveille les changements

Write-Host "🚀 Surveillance des changements - Déploiement automatique activé" -ForegroundColor Green
Write-Host "Sauvegardez un fichier pour voir le déploiement automatique..." -ForegroundColor Cyan

cd "d:\shop louise"

# Boucle infinie pour surveiller les changements
$lastHash = ""
while ($true) {
    Start-Sleep -Seconds 2
    
    # Vérifier les changements non commitées
    $status = git status --porcelain
    
    if ($status -and ($status -ne $lastHash)) {
        $lastHash = $status
        Write-Host "`n✏️  Changements détectés - Déploiement en cours..." -ForegroundColor Yellow
        
        # Commit et push automatiquement
        git add .
        git commit -m "Auto-deploy: $(Get-Date -Format 'HH:mm:ss')"
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Déploiement réussi! Vercel redéploiera dans 1-2 minutes" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors du push - vérifiez votre connexion" -ForegroundColor Red
        }
    }
}
