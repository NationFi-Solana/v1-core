export type BettingDapp = {
  "version": "0.1.0",
  "name": "betting_dapp",
  "instructions": [
    {
      "name": "initializeProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "readProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
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
    },
    {
      "name": "initPlaceSplBetA",
      "accounts": [
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSplBetB",
      "accounts": [
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSolBetA",
      "accounts": [
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSolBetB",
      "accounts": [
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "placeSolBet",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programFundsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
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
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programTokenAccountForSpl",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
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
    }
  ],
  "accounts": [
    {
      "name": "signerSplBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "publicKey"
          },
          {
            "name": "signerTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
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
      "name": "signerSolBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "publicKey"
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
      "name": "betTotalSpl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u64"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "betTotalSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u64"
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
              "vec": "publicKey"
            }
          },
          {
            "name": "solBalances",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "BetOverAndDistributed",
      "msg": "Bet is already over and winnings have already been distributed"
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
      "name": "PDAMismatchProgramFunds",
      "msg": "An invalid account for the program was passed for SOL Placement"
    },
    {
      "code": 6004,
      "name": "SignerSolBalanceInvalidOwnership",
      "msg": "User's SignerSolBalance is not owned by program"
    },
    {
      "code": 6005,
      "name": "InvalidProgramId",
      "msg": "Invalid Program ID"
    }
  ]
};

export const IDL: BettingDapp = {
  "version": "0.1.0",
  "name": "betting_dapp",
  "instructions": [
    {
      "name": "initializeProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "readProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setProgramState",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
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
    },
    {
      "name": "initPlaceSplBetA",
      "accounts": [
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSplBetB",
      "accounts": [
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSolBetA",
      "accounts": [
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initPlaceSolBetB",
      "accounts": [
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "placeSolBet",
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userSolBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programFundsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
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
      "accounts": [
        {
          "name": "programStateAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programTokenAccountForSpl",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSplBalance",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
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
    }
  ],
  "accounts": [
    {
      "name": "signerSplBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "publicKey"
          },
          {
            "name": "signerTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
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
      "name": "signerSolBalance",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signerPublicKey",
            "type": "publicKey"
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
      "name": "betTotalSpl",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u64"
          },
          {
            "name": "splTokenMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "betTotalSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "total",
            "type": "u64"
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
              "vec": "publicKey"
            }
          },
          {
            "name": "solBalances",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "BetOverAndDistributed",
      "msg": "Bet is already over and winnings have already been distributed"
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
      "name": "PDAMismatchProgramFunds",
      "msg": "An invalid account for the program was passed for SOL Placement"
    },
    {
      "code": 6004,
      "name": "SignerSolBalanceInvalidOwnership",
      "msg": "User's SignerSolBalance is not owned by program"
    },
    {
      "code": 6005,
      "name": "InvalidProgramId",
      "msg": "Invalid Program ID"
    }
  ]
};
