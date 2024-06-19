export const idl = {
    "address": "DAWzUuyZVRej6i3xAH4Cui3BW13TVCSZ3jdA4vbBLLQw",
    "metadata": {
        "name": "betting_dapp",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "cashout_winnings",
            "discriminator": [
                217,
                42,
                110,
                199,
                65,
                4,
                91,
                212
            ],
            "accounts": [
                {
                    "name": "program_state_account",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "user_authority",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "user_sol_balance",
                    "writable": true
                },
                {
                    "name": "program_funds_account",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    114,
                                    111,
                                    103,
                                    114,
                                    97,
                                    109,
                                    45,
                                    102,
                                    117,
                                    110,
                                    100,
                                    115
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "is_bet_a",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "init_place_sol_bet_a",
            "discriminator": [
                88,
                46,
                71,
                114,
                175,
                162,
                174,
                116
            ],
            "accounts": [
                {
                    "name": "user_sol_balance",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    111,
                                    108,
                                    95,
                                    98,
                                    101,
                                    116,
                                    95,
                                    97
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user_authority"
                            }
                        ]
                    }
                },
                {
                    "name": "user_authority",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "init_place_sol_bet_b",
            "discriminator": [
                69,
                105,
                187,
                47,
                23,
                46,
                100,
                137
            ],
            "accounts": [
                {
                    "name": "user_sol_balance",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    111,
                                    108,
                                    95,
                                    98,
                                    101,
                                    116,
                                    95,
                                    98
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user_authority"
                            }
                        ]
                    }
                },
                {
                    "name": "user_authority",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "initialize_program_state",
            "discriminator": [
                114,
                90,
                170,
                208,
                223,
                41,
                40,
                160
            ],
            "accounts": [
                {
                    "name": "program_state_account",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "signer",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "place_sol_bet",
            "discriminator": [
                160,
                21,
                21,
                124,
                17,
                65,
                59,
                178
            ],
            "accounts": [
                {
                    "name": "program_state_account",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "user_authority",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "user_sol_balance",
                    "writable": true
                },
                {
                    "name": "program_funds_account",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    114,
                                    111,
                                    103,
                                    114,
                                    97,
                                    109,
                                    45,
                                    102,
                                    117,
                                    110,
                                    100,
                                    115
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "is_bet_a",
                    "type": "u8"
                },
                {
                    "name": "sol_amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "read_program_state",
            "discriminator": [
                15,
                202,
                151,
                193,
                80,
                198,
                253,
                222
            ],
            "accounts": [
                {
                    "name": "program_state_account",
                    "writable": true
                }
            ],
            "args": []
        },
        {
            "name": "set_program_state",
            "discriminator": [
                203,
                151,
                175,
                121,
                203,
                127,
                188,
                248
            ],
            "accounts": [
                {
                    "name": "program_state_account",
                    "writable": true
                }
            ],
            "args": [
                {
                    "name": "bets_closed",
                    "type": "u8"
                },
                {
                    "name": "is_bet_a_winner",
                    "type": "u8"
                },
                {
                    "name": "bet_over",
                    "type": "u8"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "ProgramState",
            "discriminator": [
                77,
                209,
                137,
                229,
                149,
                67,
                167,
                230
            ]
        },
        {
            "name": "SignerSOLBalance",
            "discriminator": [
                122,
                27,
                240,
                221,
                113,
                56,
                192,
                45
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "BetOver",
            "msg": "Bet is already over"
        },
        {
            "code": 6001,
            "name": "TotalsInvalidLogic",
            "msg": "Totals Error!"
        },
        {
            "code": 6002,
            "name": "PDAMismatchProgramTokenAccount",
            "msg": "An invalid token account was passed for SPL Placement"
        },
        {
            "code": 6003,
            "name": "PDAMismatchStateProgramAccount",
            "msg": "Invalid State Program Account"
        },
        {
            "code": 6004,
            "name": "UserHasNoBalance",
            "msg": "User has no balance to cash out"
        },
        {
            "code": 6005,
            "name": "NoBetFoundToCashout",
            "msg": "No Bet Found For User To Cashout"
        },
        {
            "code": 6006,
            "name": "PDAMismatchProgramFunds",
            "msg": "An invalid account for the program was passed for SOL Placement"
        },
        {
            "code": 6007,
            "name": "PDAProgramFundsNotOwnedByProgram",
            "msg": "An invalid account for the program was passed for SOL Placement"
        },
        {
            "code": 6008,
            "name": "SignerSolBalanceInvalidOwnership",
            "msg": "User's SignerSolBalance is not owned by program"
        },
        {
            "code": 6009,
            "name": "InvalidProgramId",
            "msg": "Invalid Program ID"
        },
        {
            "code": 6010,
            "name": "ProgramAlreadyInitialized",
            "msg": "Program Already Initialized"
        },
        {
            "code": 6011,
            "name": "BetsClosedNotOver",
            "msg": "Bets Are Closed"
        },
        {
            "code": 6012,
            "name": "BetsAreClosed",
            "msg": "Bets Are Closed"
        },
        {
            "code": 6013,
            "name": "BetNotOver",
            "msg": "Bet Is Not Over"
        },
        {
            "code": 6014,
            "name": "UserLostBet",
            "msg": "User tried to cash winnings but didnt win"
        }
    ],
    "types": [
        {
            "name": "ProgramState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bets_closed",
                        "type": "u8"
                    },
                    {
                        "name": "is_bet_a_winner",
                        "type": "u8"
                    },
                    {
                        "name": "bet_over",
                        "type": "u8"
                    },
                    {
                        "name": "total_bets",
                        "type": "u64"
                    },
                    {
                        "name": "total_sol_a",
                        "type": "u64"
                    },
                    {
                        "name": "total_sol_b",
                        "type": "u64"
                    },
                    {
                        "name": "total_bets_a",
                        "type": "u64"
                    },
                    {
                        "name": "total_bets_b",
                        "type": "u64"
                    },
                    {
                        "name": "is_initialized",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "SignerSOLBalance",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "signer_public_key",
                        "type": "pubkey"
                    },
                    {
                        "name": "is_bet_a",
                        "type": "u8"
                    },
                    {
                        "name": "balance",
                        "type": "u64"
                    }
                ]
            }
        }
    ]
} 