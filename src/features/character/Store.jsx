import React, { useState, useEffect } from 'react';

const Store = ({ onBuyCharacter }) => {
    const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);
    const [purchasedCharacters, setPurchasedCharacters] = useState(JSON.parse(localStorage.getItem('purchasedCharacters')) || []);

    const characters = [
        { id: 1, name: 'BBNO$ (Fat)', cost: 5000 }
    ];

    useEffect(() => {
        localStorage.setItem('purchasedCharacters', JSON.stringify(purchasedCharacters));
    }, [purchasedCharacters]);

    const handleBuy = (character) => {
        if (score >= character.cost) {
            setScore(score - character.cost);
            localStorage.setItem('score', score - character.cost);
            setPurchasedCharacters([...purchasedCharacters, character.name]);
            onBuyCharacter(character);
        } else {
            alert('Недостаточно очков для покупки этого персонажа.');
        }
    };

    return (
        <div className="store">
            <h2 className="text-xl font-bold mb-4">Магазин</h2>
            <p className="mb-4">Ваши очки: {score}</p>
            <div className="characters-grid grid grid-cols-1 gap-4">
                {characters.map((character) => (
                    <div key={character.id} className="character-card border p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{character.name}</h3>
                        <p>Стоимость: {character.cost} очков</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => handleBuy(character)}
                            disabled={purchasedCharacters.includes(character.name)}
                        >
                            {purchasedCharacters.includes(character.name) ? 'Куплено' : 'Купить'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
