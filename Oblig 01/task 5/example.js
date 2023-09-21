const response = await Promise.any([
    fetch('https://test.com/first.txt')
    .then(response => response.text()),
    fetch('https://test.com/second.txt')
    .then(response => response.text)
]);