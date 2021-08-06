from rest_framework import serializers
from .models import Member, Vote, Position


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'email', 'username', 'password', 'is_candidate', 'asipiring_position', 'first_name',
                  'last_name', 'middle_initial', 'student_number', 'is_Officer', 'ballot_number', 'has_voted')


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'voter_name', 'voter_student_num', 'votes', 'ballot_number', 'date_voted')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('id', 'position', 'position_rank')
