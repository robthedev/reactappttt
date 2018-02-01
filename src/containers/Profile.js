import React, {Component} from 'react';
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile';

class Profile extends Component {

    static defaultProps = {
        user: {
            email: 'USER_EMAIL',
            games: [
                {
                    winner: true,
                    createdAt: '12/15/16',
                    id: '00001'
                },
                {
                    winner: false,
                    createdAt: '12/15/11',
                    id: '00002'
                },
                {
                    winner: true,
                    createdAt: '1/10/17',
                    id: '00003'
                }
            ]
        }
    }

    get records() {
        return this.props.user.games.map( (game, index) => {
            return (
                <GameRecord
                    key={index}
                    index={index}
                >
                    <Column>
                        {(game.winner) ? 'won' : 'didnt win'}
                    </Column>
                    <Column>
                        "robot"
                    </Column>
                    <Column>
                        "no"
                    </Column>
                    <Column>
                        {game.createdAt}
                    </Column>
                </GameRecord>
            )
        })
    }

    render() {
        let {email} = this.props.user
        return (
           <Container>
            <Name>
                {email}
            </Name>
            <GameList>
                <GameListHeader>
                    My Games
                </GameListHeader>
                <ColumnLabels>
                <Column>
                    Outcome
                </Column>
                <Column>
                    Guess
                </Column>
                <Column>
                    Guess correctly
                </Column>
                <Column>
                    Date
                </Column>
            </ColumnLabels>
            {this.records}
            </GameList>
           </Container>
        )
    }
}

export default Profile;