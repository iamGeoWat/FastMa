package com.fastma.fastma.entity;

import java.util.ArrayList;
import java.util.List;

public class GameExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table game
     *
     * @mbggenerated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table game
     *
     * @mbggenerated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table game
     *
     * @mbggenerated
     */
    protected List<Criteria> oredCriteria;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public GameExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table game
     *
     * @mbggenerated
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table game
     *
     * @mbggenerated
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIterationIsNull() {
            addCriterion("iteration is null");
            return (Criteria) this;
        }

        public Criteria andIterationIsNotNull() {
            addCriterion("iteration is not null");
            return (Criteria) this;
        }

        public Criteria andIterationEqualTo(Integer value) {
            addCriterion("iteration =", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationNotEqualTo(Integer value) {
            addCriterion("iteration <>", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationGreaterThan(Integer value) {
            addCriterion("iteration >", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationGreaterThanOrEqualTo(Integer value) {
            addCriterion("iteration >=", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationLessThan(Integer value) {
            addCriterion("iteration <", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationLessThanOrEqualTo(Integer value) {
            addCriterion("iteration <=", value, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationIn(List<Integer> values) {
            addCriterion("iteration in", values, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationNotIn(List<Integer> values) {
            addCriterion("iteration not in", values, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationBetween(Integer value1, Integer value2) {
            addCriterion("iteration between", value1, value2, "iteration");
            return (Criteria) this;
        }

        public Criteria andIterationNotBetween(Integer value1, Integer value2) {
            addCriterion("iteration not between", value1, value2, "iteration");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeIsNull() {
            addCriterion("total_volume is null");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeIsNotNull() {
            addCriterion("total_volume is not null");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeEqualTo(Integer value) {
            addCriterion("total_volume =", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeNotEqualTo(Integer value) {
            addCriterion("total_volume <>", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeGreaterThan(Integer value) {
            addCriterion("total_volume >", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeGreaterThanOrEqualTo(Integer value) {
            addCriterion("total_volume >=", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeLessThan(Integer value) {
            addCriterion("total_volume <", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeLessThanOrEqualTo(Integer value) {
            addCriterion("total_volume <=", value, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeIn(List<Integer> values) {
            addCriterion("total_volume in", values, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeNotIn(List<Integer> values) {
            addCriterion("total_volume not in", values, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeBetween(Integer value1, Integer value2) {
            addCriterion("total_volume between", value1, value2, "total_volume");
            return (Criteria) this;
        }

        public Criteria andTotal_volumeNotBetween(Integer value1, Integer value2) {
            addCriterion("total_volume not between", value1, value2, "total_volume");
            return (Criteria) this;
        }

        public Criteria andUser_countIsNull() {
            addCriterion("user_count is null");
            return (Criteria) this;
        }

        public Criteria andUser_countIsNotNull() {
            addCriterion("user_count is not null");
            return (Criteria) this;
        }

        public Criteria andUser_countEqualTo(Integer value) {
            addCriterion("user_count =", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countNotEqualTo(Integer value) {
            addCriterion("user_count <>", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countGreaterThan(Integer value) {
            addCriterion("user_count >", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countGreaterThanOrEqualTo(Integer value) {
            addCriterion("user_count >=", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countLessThan(Integer value) {
            addCriterion("user_count <", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countLessThanOrEqualTo(Integer value) {
            addCriterion("user_count <=", value, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countIn(List<Integer> values) {
            addCriterion("user_count in", values, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countNotIn(List<Integer> values) {
            addCriterion("user_count not in", values, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countBetween(Integer value1, Integer value2) {
            addCriterion("user_count between", value1, value2, "user_count");
            return (Criteria) this;
        }

        public Criteria andUser_countNotBetween(Integer value1, Integer value2) {
            addCriterion("user_count not between", value1, value2, "user_count");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowIsNull() {
            addCriterion("racetrack_row is null");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowIsNotNull() {
            addCriterion("racetrack_row is not null");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowEqualTo(Integer value) {
            addCriterion("racetrack_row =", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowNotEqualTo(Integer value) {
            addCriterion("racetrack_row <>", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowGreaterThan(Integer value) {
            addCriterion("racetrack_row >", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowGreaterThanOrEqualTo(Integer value) {
            addCriterion("racetrack_row >=", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowLessThan(Integer value) {
            addCriterion("racetrack_row <", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowLessThanOrEqualTo(Integer value) {
            addCriterion("racetrack_row <=", value, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowIn(List<Integer> values) {
            addCriterion("racetrack_row in", values, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowNotIn(List<Integer> values) {
            addCriterion("racetrack_row not in", values, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowBetween(Integer value1, Integer value2) {
            addCriterion("racetrack_row between", value1, value2, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andRacetrack_rowNotBetween(Integer value1, Integer value2) {
            addCriterion("racetrack_row not between", value1, value2, "racetrack_row");
            return (Criteria) this;
        }

        public Criteria andIs_bettingIsNull() {
            addCriterion("is_betting is null");
            return (Criteria) this;
        }

        public Criteria andIs_bettingIsNotNull() {
            addCriterion("is_betting is not null");
            return (Criteria) this;
        }

        public Criteria andIs_bettingEqualTo(Integer value) {
            addCriterion("is_betting =", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingNotEqualTo(Integer value) {
            addCriterion("is_betting <>", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingGreaterThan(Integer value) {
            addCriterion("is_betting >", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_betting >=", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingLessThan(Integer value) {
            addCriterion("is_betting <", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingLessThanOrEqualTo(Integer value) {
            addCriterion("is_betting <=", value, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingIn(List<Integer> values) {
            addCriterion("is_betting in", values, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingNotIn(List<Integer> values) {
            addCriterion("is_betting not in", values, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingBetween(Integer value1, Integer value2) {
            addCriterion("is_betting between", value1, value2, "is_betting");
            return (Criteria) this;
        }

        public Criteria andIs_bettingNotBetween(Integer value1, Integer value2) {
            addCriterion("is_betting not between", value1, value2, "is_betting");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table game
     *
     * @mbggenerated do_not_delete_during_merge
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table game
     *
     * @mbggenerated
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}