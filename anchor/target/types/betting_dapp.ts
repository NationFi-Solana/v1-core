/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/betting_dapp.json`.
 */
export type BettingDapp = {
  "address": "Caoz2CTRQnmNtk65QMTmwsrVww7XQycQ1tWiCY7ThkdE",
  "metadata": {
    "name": "bettingDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cashoutBet",
      "discriminator": [
        201,
        94,
        66,
        105,
        111,
        124,
        232,
        27
      ],
      "accounts": [
        {
          "name": "programStateAccount",
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
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userSolBalance",
          "writable": true
        },
        {
          "name": "programFundsAccount",
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "isBetA",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cashoutWinnings",
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
          "name": "programStateAccount",
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
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userSolBalance",
          "writable": true
        },
        {
          "name": "programFundsAccount",
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "isBetA",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initPlaceSolBetA",
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
          "name": "userSolBalance",
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
                "path": "userAuthority"
              }
            ]
          }
        },
        {
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSolBetB",
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
          "name": "userSolBalance",
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
                "path": "userAuthority"
              }
            ]
          }
        },
        {
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeProgramState",
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
          "name": "programStateAccount",
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "placeSolBet",
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
          "name": "programStateAccount",
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
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userSolBalance",
          "writable": true
        },
        {
          "name": "programFundsAccount",
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "isBetA",
          "type": "u8"
        },
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "readProgramState",
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
          "name": "programStateAccount",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "setProgramState",
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
          "name": "programStateAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "betsClosed",
          "type": "u8"
        },
        {
          "name": "isBetAWinner",
          "type": "u8"
        },
        {
          "name": "betOver",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "programState",
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
      "name": "signerSolBalance",
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
      "name": "betOver",
      "msg": "Bet is already over"
    },
    {
      "code": 6001,
      "name": "totalsInvalidLogic",
      "msg": "Totals Error!"
    },
    {
      "code": 6002,
      "name": "pdaMismatchProgramTokenAccount",
      "msg": "An invalid token account was passed for SPL Placement"
    },
    {
      "code": 6003,
      "name": "pdaMismatchStateProgramAccount",
      "msg": "Invalid State Program Account"
    },
    {
      "code": 6004,
      "name": "userHasNoBalance",
      "msg": "User has no balance to cash out"
    },
    {
      "code": 6005,
      "name": "noBetFoundToCashout",
      "msg": "No Bet Found For User To Cashout"
    },
    {
      "code": 6006,
      "name": "pdaMismatchProgramFunds",
      "msg": "An invalid account for the program was passed for SOL Placement"
    },
    {
      "code": 6007,
      "name": "pdaProgramFundsNotOwnedByProgram",
      "msg": "An invalid account for the program was passed for SOL Placement"
    },
    {
      "code": 6008,
      "name": "signerSolBalanceInvalidOwnership",
      "msg": "User's SignerSolBalance is not owned by program"
    },
    {
      "code": 6009,
      "name": "invalidProgramId",
      "msg": "Invalid Program ID"
    },
    {
      "code": 6010,
      "name": "programAlreadyInitialized",
      "msg": "Program Already Initialized"
    },
    {
      "code": 6011,
      "name": "betsClosedNotOver",
      "msg": "Bets Are Closed"
    },
    {
      "code": 6012,
      "name": "betNotOver",
      "msg": "Bet Is Not Over"
    },
    {
      "code": 6013,
      "name": "userLostBet",
      "msg": "User tried to cash winnings but didnt win"
    }
  ],
  "types": [
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "betsClosed",
            "type": "u8"
          },
          {
            "name": "isBetAWinner",
            "type": "u8"
          },
          {
            "name": "betOver",
            "type": "u8"
          },
          {
            "name": "totalBets",
            "type": "u64"
          },
          {
            "name": "totalSolA",
            "type": "u64"
          },
          {
            "name": "totalSolB",
            "type": "u64"
          },
          {
            "name": "totalBetsA",
            "type": "u64"
          },
          {
            "name": "totalBetsB",
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "signerSolBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "pubkey"
          },
          {
            "name": "isBetA",
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
};
