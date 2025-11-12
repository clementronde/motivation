# 💪 Healthy Lifestyle App

Une application web dynamique et motivante pour tracker vos habitudes saines et créer une compétition amicale entre deux utilisateurs !

## ✨ Fonctionnalités

### 🎯 Tracking d'habitudes personnalisé
- **Objectifs quotidiens** : Boire de l'eau, manger des légumes, méditer, etc.
- **Objectifs hebdomadaires** : Séances de sport, lectures, activités spécifiques
- **Personnalisation complète** : Créez vos propres objectifs avec icônes, descriptions et unités

### 📅 Calendrier hebdomadaire
- Vue d'ensemble de votre semaine avec progression visuelle
- Indicateurs de complétion pour chaque jour
- Alertes visuelles pour les objectifs manqués

### 🏆 Compétition et motivation
- Comparaison en temps réel entre les deux utilisateurs
- Bandeaux de motivation dynamiques basés sur votre progression
- Messages motivants personnalisés selon votre performance
- Système de compétition amicale avec pourcentages de réussite
- **Système de streaks (flammes)** : Maintiens une série de jours consécutifs en complétant tous tes objectifs quotidiens
- Record personnel à battre pour te motiver davantage

### 🎨 Design adaptatif double thème
- **Thème Clément** : Dark, sportif et énergique avec des couleurs néon
- **Thème Charlotte** : Girly, motivant et lumineux avec des couleurs pastel
- Interface utilisateur fluide avec animations et transitions

### 💾 Persistance des données
- Sauvegarde automatique dans le navigateur (localStorage)
- Conservation de l'historique complet de progression
- Pas besoin de compte ou de connexion

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install
```

### Lancement en développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 🎮 Utilisation

1. **Sélection du profil** : Choisissez entre Clément ou Charlotte sur la page d'accueil
2. **Créer des objectifs** : Cliquez sur "+ Nouvel Objectif" pour ajouter vos habitudes
   - Utilisez les objectifs populaires prédéfinis ou créez les vôtres
   - Définissez si c'est un objectif quotidien ou hebdomadaire
3. **Tracker votre progression** : Utilisez les boutons +/- pour mettre à jour vos objectifs
4. **Maintenir votre streak** : Complétez TOUS vos objectifs quotidiens pour allumer la flamme 🔥 et maintenir votre série de jours consécutifs
5. **Comparer avec l'autre utilisateur** : Consultez le bandeau de comparaison pour voir qui est en avance
6. **Rester motivé** : Lisez les messages motivants personnalisés selon votre performance

## 🏗️ Structure du projet

```
src/
├── components/          # Composants React
│   ├── ProfileSelector.tsx      # Sélection du profil
│   ├── Dashboard.tsx            # Page principale
│   ├── WeekCalendar.tsx         # Calendrier hebdomadaire
│   ├── GoalsList.tsx            # Liste des objectifs
│   ├── AddGoalModal.tsx         # Modal d'ajout d'objectif
│   ├── ComparisonBanner.tsx     # Bandeau de comparaison
│   ├── MotivationBanner.tsx     # Bandeau de motivation
│   └── StreakDisplay.tsx        # Affichage des séries de victoires
├── contexts/           # Contexts React
│   ├── AppContext.tsx           # État global de l'application
│   └── ThemeContext.tsx         # Gestion des thèmes
├── themes/             # Définitions des thèmes
│   └── index.ts                 # Thèmes Clément et Charlotte
├── types/              # Types TypeScript
│   └── index.ts                 # Interfaces et types
├── utils/              # Fonctions utilitaires
│   └── dateUtils.ts             # Gestion des dates et semaines
├── App.tsx             # Composant principal
└── main.tsx           # Point d'entrée
```

## 🎨 Technologies utilisées

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool ultra-rapide
- **CSS-in-JS** : Styles inline pour une isolation parfaite
- **Google Fonts** : Typographies personnalisées (Bebas Neue, Inter, Quicksand, Nunito)

## 📱 Responsive

L'application est entièrement responsive et s'adapte à tous les écrans :
- Desktop
- Tablette
- Mobile

## 🔮 Évolutions futures possibles

- [ ] Graphiques de progression sur plusieurs semaines
- [ ] Export des données en CSV/PDF
- [ ] Notifications push pour rappels
- [ ] Mode équipe avec plus de 2 utilisateurs
- [ ] Badges et récompenses virtuelles
- [ ] Synchronisation cloud optionnelle
- [ ] Statistiques détaillées et insights

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel.

---

Créé avec ❤️ pour une vie plus saine et motivante !
