/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/betting_dapp.json`.
 */
export type BettingDapp = {
  "address": "7t3Ao9DeLrYUrduk2Xa3EAF39NAYhSWGEqxPY98ShmUf",
  "metadata": {
    "name": "bettingDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
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
      "name": "initPlaceSplBetA",
      "discriminator": [
        75,
        255,
        59,
        163,
        228,
        106,
        9,
        103
      ],
      "accounts": [
        {
          "name": "userSplBalance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userTokenAccount"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  112,
                  108,
                  95,
                  98,
                  101,
                  116,
                  95,
                  97
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
          "name": "splTokenMint",
          "writable": true
        },
        {
          "name": "userTokenAccount",
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
      "name": "initPlaceSplBetB",
      "discriminator": [
        212,
        100,
        68,
        158,
        61,
        168,
        71,
        234
      ],
      "accounts": [
        {
          "name": "userSplBalance",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "userTokenAccount"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  112,
                  108,
                  95,
                  98,
                  101,
                  116,
                  95,
                  98
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
          "name": "splTokenMint",
          "writable": true
        },
        {
          "name": "userTokenAccount",
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
      "name": "placeSplBet",
      "discriminator": [
        60,
        8,
        33,
        15,
        51,
        211,
        67,
        94
      ],
      "accounts": [
        {
          "name": "programStateAccount",
          "writable": true
        },
        {
          "name": "splTokenMint",
          "writable": true
        },
        {
          "name": "programTokenAccountForSpl",
          "writable": true
        },
        {
          "name": "userAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "userSplBalance",
          "writable": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "isBetA",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "decimals",
          "type": "u8"
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
    },
    {
      "name": "signerSplBalance",
      "discriminator": [
        160,
        246,
        20,
        14,
        38,
        134,
        46,
        128
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "betOverAndDistributed",
      "msg": "Bet is already over and winnings have already been distributed"
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
      "name": "pdaMismatchProgramFunds",
      "msg": "An invalid account for the program was passed for SOL Placement"
    },
    {
      "code": 6004,
      "name": "signerSolBalanceInvalidOwnership",
      "msg": "User's SignerSolBalance is not owned by program"
    },
    {
      "code": 6005,
      "name": "invalidProgramId",
      "msg": "Invalid Program ID"
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
            "name": "betOverAndDistributed",
            "type": "u8"
          },
          {
            "name": "totalBets",
            "type": "u64"
          },
          {
            "name": "splBalances",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "solBalances",
            "type": {
              "vec": "pubkey"
            }
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
    },
    {
      "name": "signerSplBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "pubkey"
          },
          {
            "name": "signerTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "splTokenMint",
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
