#!/usr/bin/env node

/**
 * Script de déploiement automatique
 * Surveille les changements de fichiers et déploie automatiquement
 * 
 * Usage: npm run auto-deploy
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let lastModified = new Date();

console.log('🚀 Mode déploiement automatique activé');
console.log('Sauvegardez un fichier pour déclencher le déploiement...\n');

// Surveiller les changements
fs.watch(path.join(__dirname), { recursive: true }, (eventType, filename) => {
    // Ignorer node_modules, .git, dist, etc.
    if (filename &&
        !filename.includes('node_modules') &&
        !filename.includes('.git') &&
        !filename.includes('dist') &&
        !filename.includes('.vercel')) {

        const now = new Date();

        // Éviter les déploiements en cascade (attendre 1 seconde)
        if (now - lastModified > 1000) {
            lastModified = now;

            console.log(`\n✏️  ${filename} modifié - Déploiement en cours...`);

            // Exécuter git add, commit, push
            exec('git add . && git commit -m "Auto-deploy: ' + new Date().toLocaleTimeString('fr-FR') + '" && git push origin main',
                (error, stdout, stderr) => {
                    if (error && !error.message.includes('nothing to commit')) {
                        console.error('❌ Erreur:', error.message);
                        return;
                    }

                    if (stdout.includes('nothing to commit')) {
                        return; // Pas de changements
                    }

                    console.log('✅ Déploiement réussi!');
                    console.log('⏳ Vercel redéploiera dans 1-2 minutes...');
                }
            );
        }
    }
});
