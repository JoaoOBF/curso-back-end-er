CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROIS (NOME, PODER)
VALUES 
    (
        'Flash', 'Velocidade'
    ),
    (
        'Aquaman', 'Falar com os animais'
    ),
    (
        'Batman', 'Ser playboy'
    )