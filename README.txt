Um die Dateien zu bearbeiten, empfehle ich Visual Studio Code.
Um die Dateien auf einem lokalen Webserver zu testen, holt euch am besten die aktuelle Python-Version (>=3)

Navigiert in der Kommandozeile zu dem Ordner, in dem eure Führerschein-App liegt und führt darin

python -m http.server 8000 --bind 0.0.0.0

aus. Dann könnt ihr die Webseite (solange die Kommandozeile auf ist) im lokalen Browser unter localhost:8000 testen.