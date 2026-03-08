
from typing import Dict, Optional
from datetime import datetime, timezone
import math
from sqlalchemy.orm import Session
from app.models.grant import EquityStake
from app.models.user import User

class EquityService:
    """
    Manages the 'Group 100' Equity Buy-in.
    10,000 shares represent 1% total ownership.
    Price follows a curve: P = P0 * (1 + rate)^n
    """
    BASE_PRICE_USD = 100.00  # Starting price per share
    TOTAL_SHARES = 10000
    RATE_INCREMENT = 0.025   # 2.5% increment per buy-in
    
    @staticmethod
    def get_current_price(db: Session) -> float:
        """Calculates the current share price based on total seats claimed"""
        count = db.query(EquityStake).count()
        # Price curve: Each new investor pays slightly more
        # TODO: Integrate with Global Water Scarcity Index (GWSI) for dynamic valuation
        return EquityService.BASE_PRICE_USD * math.pow((1 + EquityService.RATE_INCREMENT), count)

    @staticmethod
    def process_buy_in(db: Session, user: User, amount_usd: float) -> EquityStake:
        """Processes a stock purchase and calculates shares issued"""
        price = EquityService.get_current_price(db)
        shares = int(amount_usd / price)
        
        if shares <= 0:
            raise ValueError("Investment amount too low for current share price")
            
        stake = EquityStake(
            user_id=user.id,
            shares=shares,
            purchase_price=price,
            purchased_at=datetime.now(timezone.utc)
        )
        db.add(stake)
        db.commit()
        db.refresh(stake)
        return stake

class DilutionModelingService:
    """
    Simulates the impact of funding rounds on the cap table.
    Essential for defending the $100B valuation thesis.
    """
    @staticmethod
    def simulate_round(
        current_total_shares: int,
        pre_money_valuation: float,
        investment_amount: float
    ) -> Dict[str, any]:
        """
        Calculates dilution for a given round.
        Post-Money = Pre-Money + Investment
        New Shares = Current * (Investment / Pre-Money)
        """
        post_money = pre_money_valuation + investment_amount
        dilution_pct = investment_amount / post_money
        new_shares = int(current_total_shares * (investment_amount / pre_money_valuation))
        
        return {
            "pre_money": pre_money_valuation,
            "investment": investment_amount,
            "post_money": post_money,
            "dilution_pct": round(dilution_pct * 100, 2),
            "new_shares_issued": new_shares,
            "total_shares_post": current_total_shares + new_shares
        }

    @staticmethod
    def get_100b_series_a_impact(current_total_shares: int) -> Dict[str, any]:
        """
        Specific simulation for the $100B Series A target.
        Assumes a $20B raise at a $80B pre-money valuation.
        """
        return DilutionModelingService.simulate_round(
            current_total_shares,
            pre_money_valuation=80_000_000_000.0,
            investment_amount=20_000_000_000.0
        )

class SignatureService:
    """
    Manages the royalty-free Digital Signature flow.
    Generates unique tokens for non-account signing.
    """
    @staticmethod
    def generate_signing_token(letter_id: str) -> str:
        import secrets
        return secrets.token_urlsafe(32)
        
    @staticmethod
    def verify_token(db: Session, token: str):
        from app.models.grant import SupportLetter
        letter = db.query(SupportLetter).filter(SupportLetter.token == token).first()
        if letter and letter.token_expires_at and letter.token_expires_at < datetime.now(timezone.utc):
            return None # Token expired
        return letter
