from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Vote(models.Model):
    voter_name          = models.CharField(max_length=100, unique=True)
    voter_student_num   = models.CharField(max_length=10)
    votes               = models.CharField(max_length=5000)
    ballot_number       = models.CharField(max_length=3)
    date_voted          = models.DateTimeField(verbose_name='date voted', auto_now_add=True)


class Member(models.Model):
    # custom
    email               = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username            = models.CharField(max_length=30, unique=True)
    password            = models.CharField(max_length=200)
    is_candidate        = models.BooleanField(default=False)
    asipiring_position  = models.CharField(max_length=35, default='NONE')
    first_name          = models.CharField(max_length=35)
    last_name           = models.CharField(max_length=35)
    middle_initial      = models.CharField(max_length=5)
    student_number      = models.CharField(max_length=10)
    is_Officer          = models.BooleanField(default=False)
    ballot_number       = models.CharField(max_length=3, unique=True)
    has_voted           = models.BooleanField(default=False)
    date_joined         = models.DateTimeField(verbose_name='date joined', auto_now_add=True)


class Position(models.Model):
    position            = models.CharField(max_length=100, unique=True)
    position_rank       = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])



