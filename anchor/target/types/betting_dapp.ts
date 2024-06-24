/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/betting_dapp.json`.
 */
export type BettingDapp = {
  "address": "6TeDLuCyB49xAf9781LxaBc3HPUHgPwvAzBVmQ8KyyaR",
  "metadata": {
    "name": "bettingDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addNewBet",
      "discriminator": [
        64,
        2,
        212,
        134,
        36,
        20,
        114,
        204
      ],
      "accounts": [
        {
          "name": "globalStateAccount",
          "writable": true
        }
      ],
      "args": []
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
          "writable": true
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
          "writable": true
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
          "name": "betId",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initGlobalState",
      "discriminator": [
        225,
        88,
        176,
        139,
        158,
        113,
        203,
        37
      ],
      "accounts": [
        {
          "name": "globalStateAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
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
          "signer": true,
          "address": "EgHH1EqXN6LENFC7utYJX3LcAfoH5wn7CG2RRBtxzmaf"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
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
              },
              {
                "kind": "account",
                "path": "program_state_account.id",
                "account": "programState"
              }
            ]
          }
        },
        {
          "name": "globalStateAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
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
          "name": "programStateAccount",
          "writable": true
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
              },
              {
                "kind": "account",
                "path": "program_state_account.id",
                "account": "programState"
              }
            ]
          }
        },
        {
          "name": "globalStateAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
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
          "name": "programStateAccount",
          "writable": true
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
                  98,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "global_state_account.length",
                "account": "globalState"
              }
            ]
          }
        },
        {
          "name": "globalStateAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
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
          "signer": true,
          "address": "EgHH1EqXN6LENFC7utYJX3LcAfoH5wn7CG2RRBtxzmaf"
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
          "writable": true
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
                  95,
                  102,
                  117,
                  110,
                  100,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "program_state_account.id",
                "account": "programState"
              }
            ]
          }
        },
        {
          "name": "feeAccount",
          "writable": true,
          "address": "ERR8XewvEk5cBuJDgtDmkxkKoshJ7v7Nq3bbrGgYLsdi"
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
        },
        {
          "name": "id",
          "type": {
            "array": [
              "u8",
              2
            ]
          }
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
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true,
          "address": "5bwTiogGZYCe33ZAcZQbjYmRyK39DMjnViiDpMJYZBSW"
        },
        {
          "name": "globalStateAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
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
      "name": "globalState",
      "discriminator": [
        163,
        46,
        74,
        168,
        216,
        123,
        133,
        98
      ]
    },
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
      "name": "betsAreClosed",
      "msg": "Bets Are Closed"
    },
    {
      "code": 6013,
      "name": "betNotOver",
      "msg": "Bet Is Not Over"
    },
    {
      "code": 6014,
      "name": "userLostBet",
      "msg": "User tried to cash winnings but didnt win"
    }
  ],
  "types": [
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "length",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "programState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u16"
          },
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
