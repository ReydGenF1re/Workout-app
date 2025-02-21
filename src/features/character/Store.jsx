import React, {useState, useEffect} from 'react';
import toast from "react-hot-toast";
import Button from "../../ui/Button.jsx";

const Store = ({onBuyCharacter}) => {
    const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);
    const [purchasedCharacters, setPurchasedCharacters] = useState(JSON.parse(localStorage.getItem('purchasedCharacters')) || []);

    const characters = [
        {id: 1, name: 'BBNO$', cost: 5000, available: true},
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
            toast.success(`Вы купили персонажа ${character.name}!`);
        } else {
            toast.error('Недостаточно очков для покупки этого персонажа.');
        }
    };
    //  Thanks to https://preline.co/docs/custom-scrollbar.html for scrollbar customization
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Магазин</h2>
            <p className="mb-4">Ваши очки: {score}</p>
            <div className="overflow-auto max-h-80
            [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-fuchsia-500 grid grid-cols-3 gap-4 p-2">
                {characters.map((character) => (
                    <div key={character.id} className="border border-fuchsia-500 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{character.name}</h3>
                        <p>Стоимость: {character.cost} очков</p>
                        <Button bgColor={'bg-linear-to-r from-cyan-500 to-blue-500 '} fn={() => handleBuy(character)}
                                disabled={purchasedCharacters.includes(character.name)}>
                            {purchasedCharacters.includes(character.name) ? 'Куплено' : 'Купить'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
