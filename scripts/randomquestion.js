function zufallsmodus_gefahrenlehre() {
    var questions = [ 'questions/Gefahrenlehre/1.1.01-001.html', 'questions/Gefahrenlehre/1.1.01-002.html', 'questions/Gefahrenlehre/1.1.01-003.html', 'questions/Gefahrenlehre/1.1.01-004.html',
    'questions/Gefahrenlehre/1.1.01-101.html', 'questions/Gefahrenlehre/1.1.01-102.html', 'questions/Gefahrenlehre/1.1.01-103.html', 'questions/Gefahrenlehre/1.1.01-104.html', 
    'questions/Gefahrenlehre/1.1.01-107.html', 'questions/Gefahrenlehre/1.1.01-108.html', 'questions/Gefahrenlehre/1.1.01-109.html', 'questions/Gefahrenlehre/1.1.01-110.html', 
    'questions/Gefahrenlehre/1.1.01-111.html', 'questions/Gefahrenlehre/1.1.01-112.html', 'questions/Gefahrenlehre/1.1.01-113.html', 'questions/Gefahrenlehre/2.1.01-001.html', 'questions/Gefahrenlehre/2.1.01-003.html', 
    'questions/Gefahrenlehre/2.1.01-004.html']
    window.location.href = questions[Math.floor(Math.random() * questions.length)]
}

function zufaellig_button_gefahrenlehre() {
    var questions = [ '1.1.01-001.html', '1.1.01-002.html', '1.1.01-003.html', '1.1.01-004.html',
    '1.1.01-101.html', '1.1.01-102.html', '1.1.01-103.html', '1.1.01-104.html', 
    '1.1.01-107.html', '1.1.01-108.html', '1.1.01-109.html', '1.1.01-110.html', 
    '1.1.01-111.html', '1.1.01-112.html', '1.1.01-113.html', '2.1.01-001.html', '2.1.01-003.html', 
    '2.1.01-004.html']
    window.location.href = questions[Math.floor(Math.random() * questions.length)]
}

function zufallsmodus_verhalten() {
    var questions = [ 'question1', 'question2', 'question3']
    window.location.href = questions[Math.floor(Math.random() * questions.length)]
}