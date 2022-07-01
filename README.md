# Suggestions Bot

Un bot Discord très complet qui permet a vos membres de faire des suggestions. Ils pourront ensuite voter pour leurs préférés et vous pourrez les accepter ou non. Pour plus d'info sur le bot rendez vous sur la page <a href="https://top.gg/bot/939547648438984774">top.gg

## Installation

    ```
    git clone https://github.com/Av32000/Suggestions-Bot.git
    cd ./Suggestions-Bot
    npm install
    node index.js
    ```

## Configuration

Pour configurer le bot, il vous suffit de créer un fichier `.env` dans le dossier du bot et d'y ajouter la ligne : 
``TOKEN=<TOKEN>``. Ensuite, créez un fichier `.servers.json` dans le dossier du bot et d'y ajouter la ligne : ``{"1":1}``.

## Commandes

- ``/suggestion <suggestion>``
- ``/accept <id>``
- ``/refuse <id>``
- ``/comment <id>``
- ``/help``

## Utilisation

Pour configurer le bot sur votre serveur, il vous suffit d'utiliser la commande ``/setup <SUGGESTIONS_CHANNEL>``.

Vos membres peuvent ensuite faire des suggestions en utilisant la commande ``/suggestion <suggestion>``.

Les suggestions sont ensuite affichées dans le channel ``SUGGESTIONS_CHANNEL``.

Vous pouvez les accepter ou les refuser en utilisant les commandes ``/accept <id>`` et ``/refuse <id>``.

Vous pouvez également les commenter en utilisant la commande ``/comment <id>``.
